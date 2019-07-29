const {
  html
} = require('common-tags')
const markdown = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
}).use(require('markdown-it-anchor'), {
  level: [2],
  permalink: false,
})

module.exports = {
  Figure: function ({
    src,
    alt = '',
    caption = '',
    ratio = '16/9',
    fullWidth = false,
    border = false
  }) {
    return html `
      <figure${fullWidth ? ` class="o-content__fullWidth"` : ''}>
        <div${border ? ` class="u-bordered"` : ''} style="--aspect-ratio: ${ratio};">
          <img src="${src}" alt="${alt}" />
        </div>
        ${caption ? `<figcaption>${markdown.renderInline(caption)}</figcaption>` : ''}
      </figure>
    `;
  },

  Note: function ({
    label = 'Note',
    text = '',
    type = 'default',
    labelHidden = false,
    link
  }) {
    return html `
      <div class="c-note c-note--${type}">
        <p><span class="c-note__label${labelHidden ? ' u-hidden-visually' : ''}">${label}: </span>${markdown.renderInline(text)}${link ? `<br><a class="c-note__anchor" href="${link.url}">${link.text}<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em" aria-hidden="true"viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></a>` : ''}</p>
      </div>
    `;
  },

  Stats: function ({
    items = []
  }) {
    return html `
      <dl class="c-stats">
        ${items.map((item) => `
          <dt class="c-stats__title">${item.title}</dt>
          <dd class="c-stats__description">${item.description}</dd>
        `).join('')}
      </dl>
    `;
  },

  Video: function ({
    url = '',
    ratio = '16/9',
    controls = true,
    autoPlay = false,
    loop = false,
    mute = true,
    caption = ''
  }) {
    return html `
      <figure class="c-video">
        <div style="--aspect-ratio: ${ratio};">
          <video${controls ? ` controls` : ''}${autoPlay ? ` autoPlay` : ''}${loop ? ` loop` : ''}${mute ? ` muted` : ''}>
            <source src="${url}" type="video/mp4">
            <p>Your browser doesn't support HTML5 video. Here is a <a href="${url}">link to the video</a> instead.</p>
          </video>
        </div>
        ${caption ? `<figcaption class="c-video__caption">${markdown.renderInline(caption)}</figcaption>` : ''}
      </figure>
    `;
  },

  Youtube: function (id, fullWidth = false) {
    return html `
      <figure${fullWidth ? ` class="o-content__fullWidth"` : ''} style="--aspect-ratio: 16/9;">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </figure>
    `;
  },

  Quote: function ({
    text,
    cite,
    size
  }) {
    return html `
      <figure class="c-quote">
        <blockquote class="c-quote__text${size ? ` c-quote__text--${size}` : ''}">
          <p>${markdown.renderInline(text)}</p>
        </blockquote>
        ${cite ? `<figcaption class="c-quote__cite${size ? ` u-text-align-right` : ''}">${markdown.renderInline(cite)}</figcaption>` : ''}
      </figure>
    `;
  },

  Link: function(url) {
    return html`
      <a href="${url}" class="u-link">${url.slice(url.indexOf(':') + 3)} <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em" aria-hidden="true"viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></a>
    `
  }
}