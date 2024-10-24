// src/components/Header.jsx
import React, { useEffect, useState } from 'react'
import logo from '../assets/images/logo.svg'
import SolidButton from './customs/buttons/SolidButton'

import {
  Bars4Icon,
  ArrowRightStartOnRectangleIcon,

} from '@heroicons/react/24/solid'

import {
  QuestionMarkCircleIcon,
  ComputerDesktopIcon,
  LanguageIcon
} from '@heroicons/react/24/outline'

import {
  Layout,
  Row,
  Col,
  Button,
  Drawer,
  List,
  Typography,
  Space
} from 'antd'

import { Link, useLocation } from 'react-router-dom'
import FilledButton from './customs/buttons/FilledButton'

const { Text } = Typography
const { Header } = Layout


const HeaderComponent = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  const location = useLocation()

  useEffect(() => {
    closeDrawer()
  }, [location])

  return (
    <Header className='h-14 flex justify-center items-center px-4 bg-red-200 border-b shadow-sm'>

      {/* Inner container */}
      <Row className='w-full flex justify-between items-center' >
        {/* Logo */}
        <Col>
          <Link to='/'>
            <Col>
              <img src={logo} className='w-24' alt="" />
            </Col>
          </Link>
        </Col>


        {/* Hamburger icon for mobile menu */}
        <Col className='block md:hidden'>
          <Button icon={<Bars4Icon width={30} color='black' onClick={openDrawer} />} />
        </Col>

        {/* Drawer For the Mobile Menu */}
        <Drawer title='Menu' placement='right' onClose={closeDrawer} open={isDrawerOpen} >
          <List
            itemLayout="horizontal"
            dataSource={[
              {
                icon: <QuestionMarkCircleIcon width={22} height={22} />,
                title: 'Help',
                link: '/help'
              },
              {
                icon: <ComputerDesktopIcon width={22} height={22} />,
                title: 'Appointments',
                link: '/appointments'
              },
              {
                icon: <ArrowRightStartOnRectangleIcon width={22} height={22} />,
                title: 'Login',
                link: '/login'
              },
            ]}
            renderItem={(item) => (
              <Link to={item.link}>
                <List.Item className="rounded-sm cursor-pointer hover:bg-sky-100">
                  <List.Item.Meta
                    className='pl-2'
                    avatar={item.icon}
                    title={<Text strong className="text-sm">{item.title}</Text>}
                  />
                </List.Item>
              </Link>
            )}
          />
          <FilledButton icon={<LanguageIcon width={24} />} text='English' />
        </Drawer>

        {/* Full menu - hidden on small screens */}
        <Space className='hidden md:flex' align='center' size='large'>
          <FilledButton icon={<LanguageIcon width={24} color='black' />} />
          <Link to='/login'>
            <SolidButton icon={<ComputerDesktopIcon />} text='Appointements' />
          </Link>
          <Link to='/'>
            <SolidButton icon={<QuestionMarkCircleIcon />} text='Help' />
          </Link>
          <Link to='/login'>
            <SolidButton icon={<ArrowRightStartOnRectangleIcon />} text='Login' />
          </Link>
        </Space>
      </Row>
    </Header>
  )
}
export default HeaderComponent