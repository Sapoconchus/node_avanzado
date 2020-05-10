module.exports = {
    register: {
        subject: "thank you for registering into anunciaLOL",
        body: `Thank you for registering on anunciaLOL. You will be provided with an API token on login. Username: ${this.user.username} Password: ${this.password}.`
    },
    createAd: {
        subject: `Your ad "${this.adData.title}" has been created`,
        body: `Your ad has been properly created. Thank you for using our platform and good luck!`
    },
    updateAd: {
        subject: `Your ad "${this.ad.title}" has been updated`,
        body: `Your ad has been properly updated. Thank you for using our platform and good luck!`
    },
    deleteAd: {
        subject: `Your ad "${this.ad.title}" has been deleted`,
        body: `Your ad has been properly deleted. Thank you for using our platform and we hope to see you soon`
    },

}