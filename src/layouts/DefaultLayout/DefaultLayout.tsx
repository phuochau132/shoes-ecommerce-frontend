import { Layout } from 'antd';
import React, { PropsWithChildren } from 'react';
import HeaderComponent from '../../components/header/header.component';
import { cn } from '../../utils/helpers/cn';
import FooterComponent from '@/components/footer';
import BreadcrumbComponent from '@/components/commons/breadcrumb';

const { Content } = Layout;

interface DefaultLayoutProps {
  useHeader?: boolean;
  useFooter?: boolean;
}

const DefaultLayout: React.FC<PropsWithChildren<DefaultLayoutProps>> = ({
  children,
  useHeader = false,
  useFooter = true
}) => {
  return (
    <div>
      {useHeader && <HeaderComponent />}
      <div className={cn('flex', useFooter ? 'pb-[80px]' : 'pb-[20px]', 'flex w-full justify-center')}>
        <Content style={{ minHeight: 'calc(100vh - 120px)' }} className={cn('duration-200', 'flex')}>
          <div className="h-full w-full">{children}</div>
        </Content>
      </div>
      <FooterComponent />
    </div>
  );
};

export default DefaultLayout;
