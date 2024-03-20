interface SocialLinks {
  linkedin: string;
  facebook: string;
  insta: string;
  twitter: string;
  _id: string;
}

interface Form {
  name: string;
  loggedInEmail: string;
  photo: {
    data: string;
    name: string;
  };
  image: {
    url: string;
    name: string;
    public_id: string;
  };
  email: string;
  headline: string;
  description: string;
  work?: Object[];
  socialLinks: SocialLinks[];
  _id: string;
}

interface FormState {
  data: Form;
  showModal: boolean;
  action: string;
}

interface Post extends Form {
  __v: number;
}

interface State {
  collabapi: any;
  formData: FormState;
}

export type { Post, SocialLinks, Form, FormState, State };
