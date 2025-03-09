export type CollectionName = "blog" | "projects" | "talks";


export type GlobalSite = {
  title: string;
  description: string;
  author: string;
  fname: string;
  authorPhotoSrc: string;
  logo?: {
    darkThemeSrc?: string;
    lightThemeSrc?: string;
  };
};

export const GLOBAL: GlobalSite = {
  title: "Liam Cottrell | Data Scientist",
  description: "My data science portfolio",
  author: "Liam Cottrell",
  fname: "Liam!",
  authorPhotoSrc: "/pfp1.png",
  // logo: {
  //   darkThemeSrc: "/logo/logo_dark.png",
  //   lightThemeSrc: "/logo/logo_light.png",
  // }
};


type CollectionSite =  {
  pageSize: number;
};

type HomeSite =  {
  blogEntries?: number;
  projectEntries?: number;
  talkEntries?: number;
}

export const HOME: HomeSite = {
  blogEntries: 1,
  projectEntries: 1,
  talkEntries: 1,
};

type BlogSite = CollectionSite & {
  license: {
    name: string;
    href: string;
  }
};

export const BLOG: BlogSite = {
  pageSize: 10,
  license: {
    name: "CC BY-NC-ND 4.0",
    href: "https://creativecommons.org/licenses/by-nc-nd/4.0",
  },
};

export const PROJECTS: CollectionSite = {
  pageSize: 10,
};

export const TALKS: CollectionSite = {
  pageSize: 10,
};

export const TAGS: CollectionSite = {
  pageSize: 10,
};

type ContactInfo = {
  type: string;
  href: string;
  displayAs?: string;
}

type ContactSite = ContactInfo[]

export const CONTACT: ContactSite = [
  {
    type: "Email",
    href: "mailto:liam@liamco.io",
    displayAs: "liam@liamco.io",
  },
  {
    type: "GitHub",
    href: "https://github.com/lico27",
  },
  {
    type: "LinkedIn",
    href: "https://www.linkedin.com/in/liam-cottrell/",
  },
];
