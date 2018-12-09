import * as config from 'config';
import React from 'react';

export default function ServerHTML({
    body,
    assets,
    locale,
    title,
    meta,
    nonces,
}) {
    let page_title = title;
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                {meta &&
                    meta.map(m => {
                        if (m.title) {
                            page_title = m.title;
                            return null;
                        }
                        if (m.canonical)
                            return (
                                <link
                                    key="canonical"
                                    rel="canonical"
                                    href={m.canonical}
                                />
                            );
                        if (m.name && m.content)
                            return (
                                <meta
                                    key={m.name}
                                    name={m.name}
                                    content={m.content}
                                />
                            );
                        if (m.property && m.content)
                            return (
                                <meta
                                    key={m.property}
                                    property={m.property}
                                    content={m.content}
                                />
                            );
                        return null;
                    })}
                <link rel="manifest" href="/static/manifest.json" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
                <link
                    rel="apple-touch-icon-precomposed"
                    sizes="57x57"
                    href="/images/favicons/apple-touch-icon-57x57.png"
                    type="image/png"
                />
                <link
                    rel="apple-touch-icon-precomposed"
                    sizes="114x114"
                    href="/images/favicons/apple-touch-icon-114x114.png"
                    type="image/png"
                />
                <link
                    rel="apple-touch-icon-precomposed"
                    sizes="72x72"
                    href="/images/favicons/apple-touch-icon-72x72.png"
                    type="image/png"
                />
                <link
                    rel="apple-touch-icon-precomposed"
                    sizes="144x144"
                    href="/images/favicons/apple-touch-icon-144x144.png"
                    type="image/png"
                />
                <link
                    rel="apple-touch-icon-precomposed"
                    sizes="60x60"
                    href="/images/favicons/apple-touch-icon-60x60.png"
                    type="image/png"
                />
                <link
                    rel="apple-touch-icon-precomposed"
                    sizes="120x120"
                    href="/images/favicons/apple-touch-icon-120x120.png"
                    type="image/png"
                />
                <link
                    rel="apple-touch-icon-precomposed"
                    sizes="76x76"
                    href="/images/favicons/apple-touch-icon-76x76.png"
                    type="image/png"
                />
                <link
                    rel="apple-touch-icon-precomposed"
                    sizes="152x152"
                    href="/images/favicons/apple-touch-icon-152x152.png"
                    type="image/png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/images/favicons/favicon-196x196.png"
                    sizes="196x196"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/images/favicons/favicon-96x96.png"
                    sizes="96x96"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/images/favicons/favicon-32x32.png"
                    sizes="32x32"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/images/favicons/favicon-16x16.png"
                    sizes="16x16"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/images/favicons/favicon-128.png"
                    sizes="128x128"
                />
                <meta name="application-name" content="Steemit" />
                <meta name="msapplication-TileColor" content="#FFFFFF" />
                <meta
                    name="msapplication-TileImage"
                    content="/images/favicons/mstile-144x144.png"
                />
                <meta
                    name="msapplication-square70x70logo"
                    content="/images/favicons/mstile-70x70.png"
                />
                <meta
                    name="msapplication-square150x150logo"
                    content="/images/favicons/mstile-150x150.png"
                />
                <meta
                    name="msapplication-wide310x150logo"
                    content="/images/favicons/mstile-310x150.png"
                />
                <meta
                    name="msapplication-square310x310logo"
                    content="/images/favicons/mstile-310x310.png"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600"
                    rel="stylesheet"
                    type="text/css"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Source+Serif+Pro:400,600"
                    rel="stylesheet"
                    type="text/css"
                />
                {assets.style.map((href, idx) => (
                    <link
                        href={href}
                        key={idx}
                        rel="stylesheet"
                        type="text/css"
                    />
                ))}
                <title>{page_title}</title>
            </head>
            <body>
                <div id="content" dangerouslySetInnerHTML={{ __html: body }} />
                {assets.script.map((href, idx) => (
                    <script key={idx} src={href} />
                ))}
                {config.google_ad_client ? (
                    <div>
                        <script
                            nonce={nonces[0]}
                            dangerouslySetInnerHTML={{
                                __html: `
                                    window.googleAds = {
                                        enabled: !!${config.google_ad_enabled},
                                        test: !!${config.google_ad_test},
                                        client: '${config.google_ad_client}',
                                    }
                                `,
                            }}
                        />
                        <script
                            async
                            nonce={nonces[1]}
                            src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                        />
                        <script
                            nonce={nonces[2]}
                            dangerouslySetInnerHTML={{
                                __html: `
                                    (adsbygoogle = window.adsbygoogle || []).push({
                                         google_ad_client: '${
                                             config.google_ad_client
                                         }',
                                         enable_page_level_ads: true
                                    });
                                `,
                            }}
                        />
                    </div>
                ) : null}
            </body>
        </html>
    );
}
