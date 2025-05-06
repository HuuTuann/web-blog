export enum RootPaths {
  MANAGEMENT = "/management",
  USER = "/user",
  BUSINESS = "/business",
}

export enum Paths {
  MANAGEMENT_USER = `${RootPaths.MANAGEMENT}/user`,
  MANAGEMENT_BLOG = `${RootPaths.MANAGEMENT}/blog`,
  MANAGEMENT_BUSINESS = `${RootPaths.MANAGEMENT}/business`,
  MANAGEMENT_JOB = `${RootPaths.MANAGEMENT}/job`,

  USER = `${RootPaths.USER}`,

  BUSINESS = `${RootPaths.BUSINESS}`,
  USER_DETAIL = `${RootPaths.USER}/detail`,
}
