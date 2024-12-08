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
<<<<<<< HEAD
  console.log('pageHeader', pageHeader);

=======
>>>>>>> bfcdc125da075e20b95b86ddbaa96f506f3cced4
  return (
    <div className="default-layout">
      {/* Header */}
      {useHeader && <HeaderComponent />}
<<<<<<< HEAD

      {/* Main Content */}
      <main className={cn(`${container} justify-center', useFooter ? 'pb-[80px]' : 'pb-[20px]' flex w-full`)}>
        <Content style={{ minHeight: 'calc(100vh - 120px)' }} className={`flex w-full duration-200`}>
          <div className="h-full w-full">
            {/* Page Header (Breadcrumb, Title, Description) */}
            {pageHeader && (pageHeader.breadcrumb || pageHeader.title || pageHeader.description) && (
              <div className="page-header mb-[54px]">
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
=======
      <div className={cn('flex', useFooter ? 'pb-[80px]' : 'pb-[20px]', 'flex w-full justify-center')}>
        <Content style={{ minHeight: 'calc(100vh - 120px)' }} className={cn('duration-200', 'flex')}>
          <div className="h-full w-full">{children}</div>
        </Content>
      </div>
      <FooterComponent />
>>>>>>> bfcdc125da075e20b95b86ddbaa96f506f3cced4
    </div>
  );
};

export default DefaultLayout;
