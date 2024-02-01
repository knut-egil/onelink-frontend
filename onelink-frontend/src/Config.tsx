const AppConfig = {
  endpoints: {
    api: {
      register: "/auth/register",
      login: "/auth/login",
      profile: {
        get(username: string): string {
          return `/profile/${username}`;
        },
      },
    },
  },
};

export default AppConfig;
