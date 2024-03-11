export const profileData = [
  {
    email: "john.doe@example.com",
    fullName: "John Doe",
    username: "johndoe",
    isFirstLogin: false,
    isOnboarding: {
      valid: true,
      todo: ["username", "headerLink", "socialLink"],
    },
    links: [
      {
        _id: "1",
        title: "GitHub",
        url: "https://github.com/example",
        img: "",
        type: "socialLink",
        display: true,
      },
      {
        _id: "2",
        title: "LinkedIn",
        url: "https://linkedin.com/in/example",
        img: "",
        type: "headerLink",
        display: true,
      },
    ],
    dob: "1990-01-01",
    createdAt: "2022-03-01T12:00:00Z",
    updatedAt: "2022-03-02T08:00:00Z",
  },
  {
    email: "jane.doe@example.com",
    fullName: "Jane Doe",
    username: "janedoe",
    isFirstLogin: true,
    isOnboarding: { valid: false, todo: ["username", "socialLink"] },
    links: [
      {
        _id: "3",
        title: "Twitter",
        url: "https://twitter.com/example",
        img: "",
        type: "socialLink",
        display: true,
      },
      {
        _id: "4",
        title: "Facebook",
        url: "https://facebook.com/example",
        img: "",
        type: "headerLink",
        display: true,
      },
    ],
    dob: "1995-05-15",
    createdAt: "2022-02-28T10:00:00Z",
    updatedAt: "2022-03-02T09:30:00Z",
  },
  {
    email: "alice.smith@example.com",
    fullName: "Alice Smith",
    username: "alicesmith",
    isFirstLogin: false,
    isOnboarding: { valid: true, todo: ["username", "socialLink"] },
    links: [
      {
        _id: "5",
        title: "Personal Website",
        url: "https://alicesmith.com",
        img: "",
        type: "socialLink",
        display: true,
      },
    ],
    dob: "1985-09-20",
    createdAt: "2022-03-01T08:30:00Z",
    updatedAt: "2022-03-02T11:45:00Z",
  },
];