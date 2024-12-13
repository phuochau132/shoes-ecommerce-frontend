import { Layout } from 'antd';
import React, { PropsWithChildren } from 'react';
import HeaderComponent from '../../components/header/header.component';
import { cn } from '../../utils/helpers/cn';
import FooterComponent from '@/components/footer';
import BreadcrumbComponent from '@/components/commons/breadcrumb';

const { Content } = Layout;
export type pageHeaderType = {
  breadcrumb?: { link: string; title: string }[];
  title?: string;
  description?: string;
};

interface DefaultLayoutProps {
  useHeader?: boolean;
  useFooter?: boolean;
  pageHeader?: pageHeaderType;
  container?: string;
}

const DefaultLayout: React.FC<PropsWithChildren<DefaultLayoutProps>> = ({
  children,
  useHeader = false,
  useFooter = true,
  pageHeader = null,
  container = 'container'
}) => {
  return (
    <div className="default-layout">
      {useHeader && <HeaderComponent />}

      <main className={`justify-center', ${useFooter && 'pb-[80px]'} : 'pb-[20px]' flex w-full`}>
        <Content style={{ minHeight: 'calc(100vh - 120px)' }} className={`flex w-full duration-200`}>
          <div className="h-full w-full">
            {/* Page Header (Breadcrumb, Title, Description) */}
            {pageHeader && (pageHeader.breadcrumb || pageHeader.title || pageHeader.description) && (
              <div className="page-header mb-[30px]">
                {pageHeader.breadcrumb && (
                  <nav className="breadcrumb">
                    <BreadcrumbComponent path={pageHeader.breadcrumb} />
                  </nav>
                )}
                <div className="page-heading">
                  {pageHeader.title && <h1 className="title">{pageHeader.title}</h1>}
                  {pageHeader.description && (
                    <div className="description mt-[10px]">
                      <p className="font-normal text-grey-color">{pageHeader.description}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Page Content */}
            {children}
          </div>
        </Content>
      </main>

      {/* Footer */}
      {useFooter && <FooterComponent />}
    </div>
  );
};

export default DefaultLayout;
