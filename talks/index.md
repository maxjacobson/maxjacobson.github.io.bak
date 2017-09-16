---
layout: page
title: talks
---

I sometimes do talks.
{% for talk in site.talks %}
  1. [{{talk.title}}]({{talk.url}}) -- {{talk.date | date_to_string}}
{% endfor %}
