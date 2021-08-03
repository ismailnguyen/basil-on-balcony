<template>
  <div v-if="!isLoading">
    <table id="table" class="table is-hoverable is-striped">
        <colgroup><col><col><col><col></colgroup>
        <thead>
            <tr>
                <th>
                    <div class="select is-small">
                        <select class="drop" onchange="filterTable()" v-model="filteredByGroup">
                            <option value="*">All</option>
                            <option v-for="group in groups" :key="group.name">{{group.name}}</option>
                        </select>
                    </div>
                </th>
                <th v-for="(heading, index) in headings.slice(1, headings.length-1)" :key="index">{{heading}}</th>
            </tr>
        </thead>

        <tbody class="tbody" v-for="group in groups.filter(g => g.name == filteredByGroup || filteredByGroup == '*')" :key="group.name">
            <tr>
                <th colspan="4" @click="selectGroup(group)" :class="group.isSelected ? 'folded' : 'unfolded'">{{group.name}}</th>
            </tr>
            <tr @click="selectCategory(budget.category)" v-for="budget in budgets.filter(b => b.group == group.name)" :key="budget.category" :class="selectedCategory == budget.category ? 'is-selected' : ''" v-show="!group.isSelected">
                <td>{{budget.category}}</td>
                <td>{{budget.source}}</td>
                <td>{{budget.destination}}</td>
                <td>{{budget.amount}}</td>
                <td>{{budget.notes}}</td>
            </tr>
        </tbody>
    </table>
  </div>
  <div v-else>
    <span>Loading budgets...</span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isLoading: true,
        headings: [
            'Category',
            'Source',
            'Destionation',
            'Budget',
            'Notes'
        ]
      }
    },
    async asyncData ({ $axios }) {
      const budgets = (await $axios.get('/api/budgets')).data;

      return {
        budgets: budgets,
        selectedCategory: '',
        filteredByGroup: '*',
        groups: budgets.map(b => b.group).filter((value, index, self) => self.indexOf(value) === index).map(g => ({ name: g, isSelected: false })),
        isLoading: false
      }
    },
    methods: {
        filterTable: function () {
            this.$data.budgets = this.$data.budgets.filter(b => b.group);
        },
        selectCategory: function (category) {
            if (this.selectedCategory == category) {
                this.selectedCategory = '';
            } else {
                this.selectedCategory = category;
            }
        },
        selectGroup: function (group) {
            this.$data.groups.filter(g => g.name == group.name).forEach(g => g.isSelected = !g.isSelected);
        }
    }
  }
</script>

<style scoped>
@charset "UTF-8";
:root {
  --bg-color: #ffffff;
  --th-blue: #2980b9;
  --th-onyx: #2c3032;
  --row-even: #f6f6f6;
  --row-odd: #e9e9e9;
  --row-select: #ede5e5;
  --text-white: #ffffff;
  --light-gray: #cccccc;
  --silver: #c2c2c2;
  --width: 485px;
  --margin: 7px;
  --line-height: 16px;
  --padding: 6px;
  --font-size: 14px;
}

body * {
  box-sizing: border-box;
}

.table thead {
  line-height: 42px;
}

.table thead th {
  vertical-align: top;
  text-align: center;
  background-color: #00d1b2;
  color: #fff;
  position: sticky;
  top: 0;
}

.table tbody th {
  color: #fff;
  background: #2c3032;
  text-transform: uppercase;
}

.is-selected {
  background-color: #00d1b2;
  color: #fff;
}

.drop {
  text-transform: uppercase;
}

#drop-wrapper {
  background: #2c3032;
  width: var(--width);
}

col {
  width: 15%;
}

col:first-of-type {
  width: 55%;
}

table.fixed {
  table-layout: fixed;
  width: var(--width);
}

table.fixed td {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

th .select {
  vertical-align: middle;
}

.fa-info-circle {
  padding-right: 2px;
}

.fa-info-circle:hover {
  color: orange;
  cursor: pointer;
}

.unfolded {
  color: var(--text-white);
}
.unfolded:before {
  content: "▼ ";
  color: #ccc;
}

.folded {
  color: var(--text-white);
}
.folded:before {
  content: "▶ ";
  color: #ccc;
}
</style>