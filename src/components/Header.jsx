
import React, { useEffect, useState } from 'react'
import logo from '../assets/images/logo.svg'
import SolidButton from './customs/buttons/SolidButton'

import {
  ArrowRightStartOnRectangleIcon,
  Bars4Icon,
  PencilSquareIcon
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
  Drawer,
  List,
  Typography,
  Space,
} from 'antd'

import { useTranslation } from 'react-i18next'

import { Link, useLocation } from 'react-router-dom'
import FilledButton from './customs/buttons/FilledButton'
import i18n from '../i18n'
import OutlineButton from './customs/buttons/OutlineButton'

const { Text } = Typography
const { Header } = Layout


const HeaderComponent = () => {

  const { t } = useTranslation()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  const location = useLocation()

  useEffect(() => {
    closeDrawer()
  }, [location])

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en'
    i18n.changeLanguage(newLang)
  }

  return (
    <Header className='bg-white border-b shadow-sm'>

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
        <Col className='block lg:hidden'>
          <OutlineButton icon={<Bars4Icon color='black' onClick={openDrawer} />} />
        </Col>

        {/* Drawer For the Mobile Menu */}
        <Drawer title='Menu' placement='right' onClose={closeDrawer} open={isDrawerOpen} >
          <List
            itemLayout="horizontal"
            dataSource={[
              {
                icon: <QuestionMarkCircleIcon width={22} height={22} />,
                title: t('help'),
                link: '/help'
              },
              {
                icon: <ComputerDesktopIcon width={22} height={22} />,
                title: t('appointments'),
                link: '/appointments'
              },
              {
                icon: <ArrowRightStartOnRectangleIcon width={22} height={22} />,
                title: t('login'),
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
          
          <FilledButton
            text={i18n.language === 'en' ? 'Français' : 'English'}
            icon={<LanguageIcon width={24} color='black' />}
            handleClick={toggleLanguage}
          />
        </Drawer>

        {/* Full menu - hidden on small screens */}
        <Space className='hidden lg:flex' align='center' size='large'>
          <FilledButton
            text={i18n.language === 'en' ? 'Français' : 'English'}
            icon={<LanguageIcon width={24} color='black' />}
            handleClick={toggleLanguage}
          />
          <Link to='/login'>
            <SolidButton icon={<ComputerDesktopIcon />} text='Appointements' />
          </Link>
          <Link to='/'>
            <SolidButton icon={<QuestionMarkCircleIcon />} text={t('help')} />
          </Link>
          <Link to='/register'>
            <SolidButton icon={<PencilSquareIcon />} text={t('register')} />
          </Link>
          <Link to='/login'>
            <SolidButton icon={<ArrowRightStartOnRectangleIcon />} text={t('login')} />
          </Link>
        </Space>
      </Row>
    </Header>
  )
}
export default HeaderComponent