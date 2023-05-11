import { signOut } from 'next-auth/react'
import styles from '../styles/DashboardNav.module.css'

const DashboardNav = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.flex}>
                <div className={styles.text}>
                    <p> POP // Control Room</p>
                </div>

                <div className={styles.text}>
                    <button
                        onClick={() => { signOut() }}
                    >Log out</button>
                </div>
            </div>
        </div>
    )
}

export default DashboardNav