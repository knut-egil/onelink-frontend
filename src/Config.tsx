const AppConfig = {
  endpoints: {
    api: {
      register: "/api/auth/register",
      login: "/api/auth/login",
      profile: {
        get(username: string): string {
          return `/api/profile/${username}`;
        },
      },
    },
  },
};

export default AppConfig;
