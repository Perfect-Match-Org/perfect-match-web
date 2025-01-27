import { NextPageContext } from 'next';

function Error({ statusCode, message }: { statusCode: number, message?: string }) {
    return (
        <div className="flex h-screen w-screen justify-center items-center text-red-500">
            <div className="w-1/2">
                <div className="text-xl">
                    {statusCode
                        ? `An error ${statusCode} occurred on server ${message ? `: ${message}` : ''}`
                        : `An error occurred on client  ${message ? `: ${message}` : ''}`}
                </div>
            </div>
        </div>

    )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    console.log('Error status code:', err)
    const message = err ? err.message : ''
    return { statusCode, message }
}

export default Error