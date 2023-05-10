import { useSession, signIn, signOut } from 'next-auth/react'

const dashboard = () => {
    const { data: session, status } = useSession({ required: true })

    if (status === 'authenticated') {
        console.log("User is " + status)
        console.log(session)
        return (
            <div>
                <p>Welcome, {session.user.name}</p>
                <button
                    onClick={() => signOut()}
                >Logout</button>
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