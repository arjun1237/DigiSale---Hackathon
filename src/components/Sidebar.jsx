import React from 'react'
import styles from '../styles/Sidebar.module.css'
import SidebarList from './SidebarList'
import SearchContact from './SearchContact'

export default function Sidebar(){
    return (
        <nav className={styles.sidebar}>
            <SidebarList />
            <SearchContact />
        </nav>
    )
}