import '../../static/css/style.css';
import { getWeatherInfo } from '../js/hooks/getWeatherInfo.js';
import '../js/meteo.js';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app') || document.body;
  app.innerHTML = `
    <header>
      <h1>DONUTS FRONTEND EXAM</h1>
    </header>

    <section class="bg_gray">
      <div class="section__inner">
        <h2>試験概要</h2>
        <p>コーディング課題（試験内容）に取り組んでいただきたく、ご案内いたします。</p>
        <ul class="liststyle_dot">
          <li><span class="text_bold">フロントエンドエンジニア職に応募の方</span><br>
            <ul class="liststyle_dot">
              <li>1 〜 4すべてご対応ください。</li>
              <li>「4. 提出方法」に関して、githubでの提出を推奨します。</li>
            </ul>
          </li>
          <li class="u-mt8"><span class="text_bold">デザイナー職に応募の方</span><br>
            <ul class="liststyle_dot">
              <li>「3. APIによる反映」 の対応は不要です。</li>
              <li>「4. 提出方法」に関して、githubでの提出が難しい場合、圧縮ファイルでの提出でも可です。</li>
            </ul>
        </ul>
      </div>
    </section>

    <section>
      <div class="section__inner">
        <h2>試験内容</h2>
        <h3 class="text_color_blue">1. デザインに従ってコーディングしてください</h3>
        <p>
          <a href="https://xd.adobe.com/view/6326e7bd-2396-4838-8359-32f096cac59d-3675/" target="_blank">https://xd.adobe.com/view/6326e7bd-2396-4838-8359-32f096cac59d-3675/</a>
          のデザインに沿って(問題文等も含めて)コーディングをしてください。<br>
          なお、ベースとなるソースコードは <a href="https://github.com/d-o-n-u-t-s/web-frontend-exam/" target="_blank">https://github.com/d-o-n-u-t-s/web-frontend-exam/</a> を Cloneしてご使用ください。
        </p>

        <h3 class="text_color_blue u-mt32">2. レスポンシブにコーディングしてください</h3>
        <div>
          <p>PC、モバイルそれぞれで何か1つのブラウザで確認できる状態にしてください。<br>なお、提出時に確認済みブラウザを共有下さい。</p>
        </div>

        <h3 class="text_color_blue u-mt32">3. 以下のAPIを使って、天気情報を動的に取得し反映させてください</h3>
        <div>

          <ul class="liststyle_dot lineHeight_min">
            <li>Open-Meteo WeatherForecastAPI ... <a href="https://open-meteo.com/en/docs/" target="_blank">https://open-meteo.com/en/docs/</a></li>
            <li>天気予報 API（livedoor 天気互換） … <a href="https://weather.tsukumijima.net/" target="_blank">https://weather.tsukumijima.net/</a></li>
          </ul>

          <p class="u-mt16 text_small lineHeight_min">
            ※ weatherCodeに対応する天候名とアイコンの取得は<span class="text_hover">getWeatherInfo.js</span> を使用してよいものとします。<br>
            ※ どちらも観測地点は東京とし、(緯度, 経度) = (35.6785, 139.6823) とします。<br>
            ※ APIからの取得が難しい場合は、レイアウトのみ再現してください。
          </p>
        </div>

        <h3 class="text_color_blue u-mt32">4. 以下のいずれかの方法で提出をしてください</h3>
        <div>
          <p class="lineHeight_min">
          ・ご自身のgithub上にリポジトリを作成し、そこにpushした上で、リポジトリURLを共有する。<br>
          ・clone先のディレクトリを.gitディレクトリを含んだ状態で圧縮(zip, tar等)し、添付して提出する。
          </p>
        </div>
      </div>
    </section>

    <section>
      <div class="section__inner">
        <h2>今週の天気</h2>
        <div id="today-tomorrow" class="today_tomorrow"></div>

      </div>
    </section>

    <section>
      <div class="section__inner">
        <h2>今週の天気</h2>
        <div id="weekly" class="weekly"></div>
      </div>
    </section>


    <footer>
      <p>&copy; DONUTS Co. Ltd.</p>
    </footer>
    `;
});
