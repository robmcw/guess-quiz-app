import { useSession, signIn } from 'next-auth/react'
import DashboardNav from '../components/DashboardNav'

const dashboard = () => {
    const { data: session, status } = useSession({ required: true })

    if (status === 'authenticated') {
        console.log("User is " + status)
        console.log(session)
        return (
            <div>
                <DashboardNav
                />
            </div>
        )
    } else {
        console.log("User is " + status)
        return (
            <div>
                <p>You are not logged in</p>
                <button
                    onClick={() => signIn()}
                >Sign in</button>
            </div>
        )
    }
}

export default dashboard