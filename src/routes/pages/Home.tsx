import React, { useContext } from "react";
import { AuthContext } from "src/providers/contexts/Auth";

import { PageContainer } from "./PageContainer";

export const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <PageContainer>
      <pre>{JSON.stringify(user, null, 4)}</pre>
    </PageContainer>
  );
};
