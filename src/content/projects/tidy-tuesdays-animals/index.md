---
title: "Tidy Tuesdays Animals"
description: "An exploration of the Longbeach Animal Shelter dataset"
date: "2025-03-11"
# ogImage: "/images/article-og-image.png"
draft: false
tags:
  - tidytuesdays
  - dataanalysis
  - animals
  - hypothesistest
  - wafflechart
---

## Test


```r setup, include=FALSE
knitr::opts_chunk$set(echo = TRUE)
library(tidyverse)
library(waffle)

longbeach <- read_csv('https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-03-04/longbeach.csv', show_col_types = FALSE)

```

## Data Analysis Plan

1. How long does it take an animal to be adopted from a shelter in California?
2. Which animal colours are most common at the shelter?
3. Is there a relationship between animal age and length of time to adopt?
4. What proportion of animals arrive in an injured or ill condition?

## Q1. How long does it take an animal to be adopted from a shelter in California?

```r
# figure out adoption times, remove NAs and 0 days
adoption <- longbeach %>%
  select(intake_date, outcome_date, outcome_type) %>%
  filter(outcome_type == 'adoption') %>%
  mutate(adoption_time = as.numeric(outcome_date -intake_date, na.rm=TRUE)) %>%
  filter(!is.na(adoption_time)) %>%
  filter(adoption_time > 0) %>%
  arrange(-adoption_time)

head(adoption)

```

### Exploratory Data Analysis

```r
# adoption times descriptive statistics
time <- adoption$adoption_time
summary(time)
```

```r
# histogram of adoption times
ggplot(adoption, aes(x = adoption_time)) +
  geom_histogram(bins = 60, fill = "#FFA07A", color = "white") +
  scale_x_log10() +
  labs(x = "Length of time to adoption (days)", 
       y = "Frequency",
       caption = "log10 scale") +
  theme_minimal()

```

### Hypothesis test

The null hypothesis is $H_0: \mu = 48.61$. 

```r
# hypothesis test
t.test(time, mu = 48.61, alternative = "two.sided")
```

**The p-value is 0.998 so we fail to reject the null hypothesis. Based on the data, we are 95% confident that the average time taken for an animal to be adopted from a shelter in California is between 46.9 and 50.3 days.**

## Q2. Which animal colours are most common at the shelter?

```r
# analyse colour
colour_animal <- longbeach %>%
  count(primary_color, name = "Frequency") %>%
  filter(Frequency > 10) %>%
  arrange(-Frequency)
colour_animal
```

### Consolidate colours into simplified categories

```r
# very unscientific grouping - for learning purposes only
colour_animal <- colour_animal %>%
  mutate(primary_color = case_when(
    primary_color %in% c('orange tabby', 'apricot', 'blonde', 'fawn', 'flame point', 'gold', 'orange', 'red', 'red merle', 'yellow', 'yellow brindle') ~ 'ginger',
    primary_color %in% c('black', 'black smoke', 'black tabby') ~ 'black',
    primary_color %in% c('grey lilac', 'silver tabby','gray tabby', 'blue', 'blue brindle', 'blue merle', 'blue point', 'gray', 'seal', 'seal point', 'silver') ~ 'grey',
    primary_color %in% c('brown', 'brown tabby', 'brown merle', 'brown brindle', 'buff', 'chocolate', 'chocolate point', 'tan', 'brown tiger', 'brown  merle', 'brown  tabby') ~ 'brown',
    primary_color %in% c('cream tabby', 'cream', 'snowshoe', 'white') ~ 'white',
    primary_color %in% c('lynx point', 'lilac point', 'point', 'tricolor', 'lilac lynx point', 'calico', 'calico dilute', 'calico tabby', 'calico point', 'torbi', 'tortie', 'tortie dilute') ~ 'multicolour',
    TRUE ~ primary_color
  )) %>%
  arrange(primary_color)

```

```r
# waffle plot of colours
ggplot(colour_animal, aes(fill=primary_color, values=Frequency/20)) +
  geom_waffle(color = "white", size = 0.1, n_rows = 30) +
  theme_void() +
  coord_fixed(ratio = 1) +
  scale_fill_manual(values = c("#000000", "#622a0f", "#FFA07A", "#2df47a", "#a9a9a9", "#FF6347", "#fbb1f3","#b1d9fb","#eeeee6" )) +
  theme(legend.title = element_blank()) 
```

