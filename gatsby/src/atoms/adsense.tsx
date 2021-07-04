import React, { VFC } from 'react'

const AdsenseDisplay: VFC = () => (
  <div className="adsense-display">
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    ></script>
    {/* <!-- sidebar --> */}
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-5398116960197196"
      data-ad-slot="4106156695"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  </div>
)

export default AdsenseDisplay
