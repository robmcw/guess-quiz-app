import styles from '../styles/DashboardActionBar.module.css'

const DashboardActionBar = () => {

    return (
        <div className={styles.actionBar}>
            <div className={styles.heading}>
                <div className={styles.liveCircle} ></div>
                <h3>Current collection</h3>
            </div>
            <div className={styles.btnGroup}>
                <button className="button-secondary">All collections</button>
                <button >+ New collection</button>
            </div>
        </div>
    )
}

export default DashboardActionBar