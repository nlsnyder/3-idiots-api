const Sib = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

//create instance of api
const tranEmailApi = new Sib.TransactionalEmailsApi();

const sender = {
  email: process.env.MAIL_EMAIL,
  name: "3 Idiots Website",
};

const receivers = [
  {
    email: "snides111@gmail.com",
  },
];

const contactUsEmailOptions = {
  sender,
  to: receivers,
  templateId: 1,
  subject: "Contact Us | Form Submission",
  params: { name: "", email: "", message: "" },
};

module.exports = { options: contactUsEmailOptions, api: tranEmailApi };
