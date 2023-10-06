import { ID, Acccount, Client, Account } from "appwrite";

const appwriteClient = new Client();
const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = "651d5abf797921d96f91";

class AppwriteService {
  account;
  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.account = new Account(appwriteClient);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        //Todo create login feature
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: service.js:33 ~ AppwriteService ~ createAccount ~ error:",
        error
      );
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log(
        "🚀 ~ file: service.js:40 ~ AppwriteService ~ login ~ error:",
        error
      );
    }
  }

  // async getCurrentUser() {
  //   try {
  //     return await this.account.get();
  //   } catch (error) {
  //     console.log(
  //       "🚀 ~ file: service.js:48 ~ AppwriteService ~ getCurrentUser ~ error:",
  //       error
  //     );
  //   }
  // }
  async getCurrentUser() {
    try {
      const session = await this.account.get();
      console.log("User Sessions:", session);

      const user = await this.account.get();
      console.log("Current User:", user);

      return user;
    } catch (error) {
      console.log(
        "🚀 ~ file: service.js:48 ~ AppwriteService ~ getCurrentUser ~ error:",
        error
      );
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.log(
        "🚀 ~ file: service.js:64 ~ AppwriteService ~ logout ~ error:",
        error
      );
    }
  }
}

export default AppwriteService;
