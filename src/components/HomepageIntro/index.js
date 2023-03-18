import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function HomepageIntro() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2>About Me</h2>
        <div className="row">
          <div className={clsx('col col--4')}>
            <img src="/img/portrait.jpg"></img>
          </div>
          <div className={clsx('col col--8')}>
            <h3>おーじぇい</h3>
            <p>エンジニア / ITコンサルタント</p>
            <p>1999年9月生まれ。愛知県出身。現在は神奈川県横浜市在住。</p>
            <p>大学在学に趣味でプログラミングを始め、フロントエンドからバックエンド、インフラ等幅広い領域の開発を経験。また、友人が立ち上げた会社にて、リードエンジニアとして設計やチームリーディングに携わる。現在は都内にてITコンサルタントとして勤務。</p>
            <p>(Photos by <a href="https://twitter.com/kspace_trk" target="_blank">@kspace_trk</a>)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
