import { Layout } from 'antd';
import React, { PropsWithChildren, useState } from 'react';
import HeaderComponent from '../../components/header/header.component';
import { cn } from '../../utils/helpers/cn';
import FooterComponent from '@/components/footer';

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
  // const { pathname } = useLocation();
  // console.log(pathname);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      {useHeader && <HeaderComponent />}
      <div className={cn('flex', useFooter ? 'pb-[80px]' : 'pb-[20px]', 'flex w-full justify-center')}>
        <Content style={{ minHeight: 'calc(100vh - 120px)' }} className={cn('duration-200', 'flex')}>
          <div className="h-full w-full"> {children}</div>
        </Content>
      </div>

      <FooterComponent />
    </div>
  );
};

export default DefaultLayout;
