
import { Web3Provider } from "components/providers"
export default function BaseLayout({children}) {

    return (

        <Web3Provider>
            <div>                
                <div>
                    {children}
                </div>
            </div>            
        </Web3Provider>
    )
}