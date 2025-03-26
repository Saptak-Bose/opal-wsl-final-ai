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

type NotificationProps = {
  status: number;
  data: {
    _count: {
      notification: number;
    };
  };
};

type PlanProps = {
  status: number;
  data: {
    subscription: {
      plan: "PRO" | "FREE";
    } | null;
  };
};
