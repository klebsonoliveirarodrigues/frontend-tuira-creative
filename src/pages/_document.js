import document, {Html, Head, Main, NexScript  } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static async getInitialProps(ctx){
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try{
            ctx.renderPage({
                enhanceApp: (App) => (props) =>
                    sheet.collectStyles(<App {...props}/>)
            })

            const initialProps = await Document.getInitialProps(ctx)
            return{
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            } 
        }finally{
            sheet.seal()
        }
    }

    // adicionando SEO para o site
    render(){
        return(
            <Html lang="tp-br">
                <Head>
                    <link
                        rel="shotcut icon"
                        href="/favicon.ico"
                        type="image/x-icon"
                        />
                    <link rel="canonical" href="http://" />
                    <meta name="description" content="Description" />
                    <meta property="og:type" content="website"/>

                    <link 
                        rel="preconnect"
                        href="http://fonts.googleapis.com"
                    />
                    <link 
                        rel="preconnect"
                        href="http://fonts.gstatic.com"
                        crossOrigin="true"
                    />

                    <link 
                        href="http://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;700&display=swap&family=Playfair+Display:ital,wght@1,700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main/>
                    <NexScript/>
                </body>
            </Html>
        )
    }
}