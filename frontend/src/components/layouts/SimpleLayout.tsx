import Header from "@/components/Header";
import { CommonProps } from "@/@types/common";
import { ReactNode } from "react";
import PageContainer from "../PageContainer";
import Link from "next/link";

export interface SimpleLayoutProps extends CommonProps {
  contained?: boolean;
  pageContainerType?: "default" | "gutterless" | "contained";
  header?: string | ReactNode;
}

const HeaderActionsStart = () => {
  return (
    <>
      <div
        className="hidden md:block"
        style={{
          ...{ width: "auto" },
        }}
      >
        <Link href="/" className="text-2xl font-bold">
          Solace
        </Link>
      </div>
    </>
  );
};


const SimpleLayout = (props: CommonProps) => {
  const { children } = props;
  return (
    <div className="app-layout-simple flex flex-auto flex-col min-h-screen">
      <div className="flex flex-auto min-w-0">
        <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
          <Header
            container
            className="shadow dark:shadow-2xl"
            headerStart={<HeaderActionsStart />}
          />
          <PageContainer pageContainerType="contained">
            {children}
          </PageContainer>
        </div>
      </div>
    </div>
  );
};

export default SimpleLayout;
