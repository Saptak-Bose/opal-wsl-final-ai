type WorkspaceProps = {
  data: {
    subscription: {
      plan: "FREE" | "PRO";
    } | null;
    workSpace: {
      id: string;
      name: string;
      type: "PUBLIC" | "PERSONAL";
    }[];
    members: {
      WorkSpace: {
        id: string;
        name: string;
        type: "PUBLIC" | "PERSONAL";
      };
    }[];
  };
};

type MenuItemProps = {
  title: string;
  href: string;
  icon: Readonly<ReactNode>;
};
