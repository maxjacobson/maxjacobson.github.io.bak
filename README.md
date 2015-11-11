# [hardscrabble.net](http://hardscrabble.net)

my personal site. powered by [jekyll](http://jekyllrb.com/) and hosted on
[github pages](http://pages.github.com/)

## working on the site

(note to self)

* Run `bundle` to get the necessary gems.
* Run `exe/serve` to generate (and watch for changes then recompile) visit <http://localhost:1234>

## publishing a new post

* run `exe/new my great post` to create a draft file.
* run `exe/publish _drafts/my-great-post.md` to move that file into the `_posts`
directory and add the current timestamp

(Under the hood these are using [Mr. Poole][poole], a butler for Jekyll.)

[poole]: https://github.com/mmcclimon/mr_poole

## writing a guest post

I'm not actively seeking this out to happen, but I recently added a little logic
to the layout that enables guest posts, so here's what that should look like. If
you want to write one, fork the repo, write a post with YAML frontmatter that
looks like the following, and submit a pull request:

```yaml
title: my great blog post
author: my name
author_url: http://myblog.info
date: 1969-10-31
```

The `author_url` is optional. If it's filled in, your name in the byline will be
a link to that URL.

## adding a podcast episode

* record and export an mp3 (the feed assumes mp3)
* upload it to s3, make public, copy the URL
* add a file to _metaphorloop_episodes named, e.g. 4.md for episode 4
* required attributes in the header:
  * `title`
  * `summary`
  * `date`
  * `audio_url`
  * `number_of_bytes` -- actually count the bytes of the audio file, e.g. 4000000
  * `length_as_text` -- e.g. "07:05"
* optional attributes in the header:
  * `custom_art` if an episode should have special art, link it here

