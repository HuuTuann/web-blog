import { UserOption } from "@/constants";

const options = [
  {
    label: "Blog",
    value: UserOption.BLOG,
  },
  {
    label: "Business",
    value: UserOption.BUSINESS,
  },
  {
    label: "Job",
    value: UserOption.JOB,
  },
];

const UserHelpers = {
  options,
};

export default UserHelpers;
