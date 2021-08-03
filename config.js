require('dotenv').config();

export default {
    siteName: process.env.SITE_NAME || "Basil on balcony",
    siteDescription: process.env.SITE_DESCRIPTION || "Budget management tool",
    siteUrl: process.env.SITE_URL || 'https://a-software-crafter-s-journey.now.sh',
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    budgetsFilePath: process.env.BUDGETS_FILE_NAME || 'data/budgets.xlsx',
    transactionsFolderPath: process.env.DATA_FOLDER_NAME || 'data/transactions',
};
