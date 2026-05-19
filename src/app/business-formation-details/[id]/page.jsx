import React, { Suspense } from "react";
import FormationPage from "./FormationPage";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <FormationPage></FormationPage>
      </Suspense>
    </div>
  );
};

export default Page;
