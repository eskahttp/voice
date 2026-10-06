import { redirect } from 'next/navigation'

export default function NotFound() {
    redirect('/client/me')

    return null;
}