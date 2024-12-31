# Algonquian Word-Structure Basics

(Written for the Nisinoon Project; last updated December 31, 2024) {.title-note}

Monica Macaulay {.author}

## Introduction {#introduction}

This document provides an overview of word structure in Algonquian languages.

**Caveat:** The view in this document is strongly influenced by my familiarity with some of the Central Algonquian languages (especially Menominee); it may not be quite right for some of the other languages, especially the Plains languages, which are really different. But this should work for most of the languages. I will make updates as I learn more! (Input appreciated!)

## Contents {#contents}

- [Lexical Categories (Parts of Speech)](#lexical-categories)
- [Derivation vs. Inflection](#derivation-vs-inflection)
- [Components](#components)
- [Hyphenation](#hyphenation)
- [Animacy](#animacy)
- [Verb Types](#verb-types)
- [Paired Verb Stems](#paired-verb-stems)
- [Primary vs. Secondary Derivation](#primary-vs-secondary-derivation)
- [Formatives](#formatives)
- [Deverbal Formations](#deverbal-formations)
- [References](#references)
{.bulleted .list}

## Lexical Categories (Parts of Speech) {{> backlink/backlink }} {#lexical-categories}

The classic way to divide up Algonquian lexical categories at the very highest level is according to whether they inflect or not (see next section for the distinction between [Derivation vs. Inflection](#derivation-vs-inflection)):

1. Do inflect (take endings)
   - Verbs
   - Nouns
2. Do not inflect
   - Particles

{.numbered .list}

Sometimes a few other things are included under the “do inflect” heading, e.g., pronouns, negators, etc. <dfn>Particle</dfn> is usually a vast category, and some authors subdivide it further, adding, for example, prepositions (see, e.g., Oxford [[2007](#Oxford2007)] for discussion of the category <dfn>particle</dfn> in Innu-Aimun).

Note that there aren't any adjectives or adverbs (although some authors do use these labels).

## Derivation vs. Inflection {{> backlink/backlink }} {#derivation-vs-inflection}

The distinction is a little fuzzy around the edges, but basically:

- <dfn>Derivation</dfn> creates <dfn>stems</dfn>; derivational morphemes have meaning or function (like making a noun stem into a verb stem)
- <dfn>Inflection</dfn> creates <dfn>words</dfn>; adds information that doesn't really change the meaning of the stem; it just provides information like person (e.g. the subject is first person {{{tln 'I' }}}, number (singular or plural), etc.
{.bulleted .list}

In Algonquian languages you pretty much always have to have inflection on verbs (except in some cases where we might argue that there's a zero morpheme).

This project is concerned with the derivational morphemes of Algonquian.

## Components {{> backlink/backlink }} {#components}

The basic derivational morphemes in Algonquian languages are called <dfn>components</dfn>, and Nisinoon is a cross-Algonquian dictionary of these components. There are three types, which correspond to where in the stem they appear. These are illustrated in the following template:

<figure class=figure id=fig:components>
  <figcaption class=caption>Algonquian Stem Components</figcaption>
  <table>
    <tr>
      <td>Initial</td>
      <td>Medial</td>
      <td>Final</td>
    </tr>
  </table>
</figure>

- <dfn>Initials</dfn> are also called <dfn>roots</dfn>.
- <dfn>Medials</dfn> tend to be nominal in character and are optional.
- <dfn>Finals</dfn> determine the lexical category (part of speech) of the stem, and sometimes add additional meaning too.
{.bulleted .list}

There are (at least!) two ways of looking at the make-up of stems: one view is that a stem can be formed of an initial by itself; an initial and a final; or an initial, a medial, and a final (see, e.g., Goddard [1990](#Goddard1990)). The other view is that initials and finals are obligatory, but sometimes the final is a zero morpheme just carrying lexical category (Cowell and Moss [[2008](#CowellMoss2008)], for example, take this view for verb stems; see also Wolfart [[1973](#Wolfart1973)]).

Some authors allow for double medials; other authors do not. Authors who want to rule them out will say one of the (apparent) medials is really part of another component. Either way, though, it's not common.

Finals can just give a word its lexical category (in which case they're called <dfn>abstract</dfn>), or they can have some lexical meaning in addition to providing a lexical category (in which case they're called <dfn>concrete</dfn>). Some authors divide finals into a concrete part and an abstract part (see below, on formatives).

Examples (components in slashes in the third line; this line does not include inflectional morphology):

{{#igl 'slashes'}}

# Menominee
\lg  mez
\txn pemētaehkipew
\m   paemet‑   ‑aehkw‑ ‑ape
\gl  crosswise face    sit
\wlt initial   medial  final
\tln S/he sits sideways.
\s   Bloomfield (<a href=#Bloomfield1975>1975</a>: 208)

# SW Ojibwe
\lg  ciw
\txn ozhaashisagaa
\m   ozhaash‑ -sag-  -aa
\gl  slippery floor  STAT
\wlt initial  medial final
\tln It is a slippery floor.
\s   Nichols (<a href=#Nichols2015>2015</a>)

# Delaware
\lg  del
\txn kwənaskwat
\m   kwən‑   ‑askw‑ ‑at
\gl  long    grass  INAN
\wlt initial medial final
\tln It is long grass.
\s   O’Meara (<a href=#Omeara1990>1990</a>: 250)

# Blackfoot
\lg  bla
\txn sisáápittakit
\m   siso-   -ap-       -ittaki
\gl  cut     stringlike by.blade
\wlt initial medial     final
\tln shred (the hide) into strips
\s   Frantz & Genee (<a href=#FrantzGenee2015>2015</a>)

{{/igl}}
{{!-- Double space after interlinear in order for subsequent markdown to parse correctly. --}}


(In these examples, the components are given in their underlying forms, which differ in some cases from the forms as they show up in the actual word.)

Components occur in all lexical categories, not just verbs. But the particles tend to be fairly simple in structure, and the nouns are generally simpler than the verbs. It's in the verbs that you see the really complex combinations.

## Hyphenation {{> backlink/backlink }} {#hyphenation}

In Nisinoon, our standard for hyphens is:

- **Initials:** hyphen at right, e.g. {{{inex 'siso-' 'mez'}}} 'cut'; Blackfoot
- **Medials:** hyphen on both sides, e.g. {{{inex '-askw-' 'mez'}}} 'grass'; Delaware
- **Finals:** hyphen at left, e.g. {{{inex '-ape' 'mez'}}} 'sit'; Menominee
{.bulleted .list}

However, other authors don't necessarily follow this. In that case we enter the data their way but convert it to the standard above in the project orthography.

## Animacy {{> backlink/backlink }} {#animacy}

Nouns in Algonquian languages can be animate or inanimate.

- This can correlate with intuitive notions of animacy, i.e. if something is living it should be animate, but if not, it should be inanimate. But this is by no means always the case. It's just like gender in European languages---there, some nouns might be masculine, some might be feminine, but there's not necessarily any correlation with the object and sex. (Tables are feminine in Spanish, but masculine in German, for example. Why?) There's a huge literature on why particular nouns are either animate or inanimate in Algonquian languages; for our purposes we'll just say it can be arbitrary.

- In most of the languages the plural is different depending on animacy---e.g. in Menominee, animate plurals have the suffix {{{inex '‑ak' 'mez'}}} and inanimate plurals have the suffix {{{inex '-an' 'mez'}}} ({{{inex 'āmōw' 'mez'}}} {{{tln 'bee' 'mez'}}}, {{{inex 'āmōw**ak**' 'mez'}}} {{{tln 'bees'}}}; {{{inex 'mēn' 'mez'}}} {{{tln 'blueberry'}}}, {{{inex 'mēn**an**' 'mez'}}} {{{tln 'blueberries'}}}).

- In a few of the languages, e.g. Miami-Illinois (and in the hypothetical proto-language), the singular also has different suffixes depending on animacy.

- Verbs agree with subjects or objects in animacy; see next section.

{.bulleted .list}

## Verb Types {{> backlink/backlink }} {#verb-types}

Verbs in Algonquian languages are categorized in two ways:

- <dfn>Transitivity</dfn> (intransitive just has a subject; transitive has subject and object)
- <dfn>Animacy</dfn> (animate or inanimate)
{.bulleted .list}

The two intersect like this:

<div class=fig-item-wrapper>

Table: Verbs and Animacy {.caption}

|                         |                          | Subject   | Object    |
| ----------------------- | ------------------------ | --------- | --------- |
| Animate Intransitive    | <abbr class=gl>ai</abbr> | animate   |           |
| Inanimate Intransitives | <abbr class=gl>ii</abbr> | inanimate |           |
| Transitive Animate      | <abbr class=gl>ta</abbr> |           | animate   |
| Transitive Inanimate    | <abbr class=gl>ti</abbr> |           | inanimate |

{#tab:verb-types .fig-item .table}

</div>

That is, intransitive verbs are categorized by the animacy of their subjects (and of course they don't have objects), and transitive verbs are categorized by the animacy of their objects. The abbreviations given for each type are used extensively.

This matters because there are different verb paradigms (sets of endings) for each type. And for our purposes, verb finals will create not just verb stems, but verb stems of a particular type (e.g. a <abbr class=gl>ta</abbr> verb stem).

Some of the types have subcategories, which are usually numbered---the <abbr class=gl>ai</abbr> and <abbr class=gl>ti</abbr> verbs have these, so you'll see e.g. <abbr class=gl>ai2</abbr> or <abbr class=gl>ti1</abbr>. In some of the languages you'll see, e.g., <abbr class=gl>ti1a</abbr> and <abbr class=gl>ti1b</abbr>.

## Paired Verb Stems {{> backlink/backlink }} {#paired-verb-stems}

Usually, verbs come in pairs---<abbr class=gl>ai</abbr> and <abbr class=gl>ii</abbr>, <abbr class=gl>ta</abbr> and <abbr class=gl>ti</abbr>. For example, in Menominee:

<ol class=examples>

  <li class=ex>
    <ol class=subexamples>
      <li><p>{{{inex 'pāpaehcen' 'mez'}}} {{{tln 'he, she, it (an.) falls'}}} (<abbr class=gl>ai</abbr>)</p></li>
      <li><p>{{{inex 'pāpaehnaen' 'mez'}}} {{{tln 'it (inan.) falls'}}} (<abbr class=gl>ii</abbr>)</p></li>
    </ol>
    <p class=ex-source>Bloomfield (<a href=#Bloomfield1975>1975</a>: 200)</p>
  </li>

  <li class=ex>
    <ol class=subexamples>
      <li><p>{{{inex 'na͞ewa͞ew' 'mez'}}} {{{tln 's/he sees him, her, it (an.)'}}} (<abbr class=gl>ta</abbr>)</p></li>
      <li><p>{{{inex 'na͞emwah' 'mez'}}} {{{tln 's/he sees it (inan.)'}}} (<abbr class=gl>ti</abbr>)</p></li>
    </ol>
    <p class=ex-source>Bloomfield (<a href=#Bloomfield1975>1975</a>: 154)</p>
  </li>

</ol>

You can see that they differ, but only a bit. Usually the difference comes in the final, which makes sense, because that's the component that gives a stem its category.

In some cases you find sets of four, where all four verb types are based on a common initial, e.g. Menominee {{{inex 'maehkīhotaew' 'mez'}}} {{{tln 'it (inanimate) is painted red'}}} <abbr class=gl>ii</abbr>, {{{inex 'maehkīhosow' 'mez'}}} {{{tln 'it (animate) is painted red'}}} (<abbr class=gl>ai</abbr>), {{{inex 'maehkīhonaew' 'mez'}}} {{{tln 's/he paints him, her, it (animate) red'}}} <abbr class=gl>ta</abbr>, and {{{inex 'maehkīhotaw' 'mez'}}} {{{tln 's/he paints it red'}}} <abbr class=gl>ti</abbr>.

## Primary vs. Secondary Derivation {{> backlink/backlink }} {#primary-vs-secondary-derivation}

What was described in the [Components](#components) section is what is known as <dfn>primary derivation</dfn>, where an initial, an optional medial, and a final form a stem. But you can take a stem created this way and add another final to it to create a larger stem---this is called <dfn>secondary derivation</dfn>. (Authors use different terms for what I’m calling the "stem" here; some call it an "initial" or a "derived initial".) These are illustrated below (these templates come from my in-progress Menominee grammar [Macaulay, [in prep](#MacaulayPrep)]):

<figure class=figure id=fig:primary-derivation>
  <figcaption class=caption>Primary Derivation</figcaption>
  <table>
    <tr>
      <td>Initial</td>
      <td>Medial</td>
      <td>Final</td>
    </tr>
  </table>
</figure>

<figure class=figure id=fig:secondary-derivation>
  <figcaption class=caption>Secondary Derivation</figcaption>
  <table>
    <tr>
      <td>
        <table>
          <tr>
            <td>Initial</td>
            <td>Medial</td>
            <td>Final</td>
          </tr>
          <tr>
          <td class=stem-cell colspan=3>Stem</td>
          </tr>
        </table>
      </td>
      <td>
        <table>
          <tr>
          <td>Final</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</figure>

Some finals can only be used in primary derivation, some can only be used in secondary derivation, but some can be used in both.

Following are some examples from Menominee:

<ol class=examples>

  <li class=ex>
    <p>{{{inex 'kōhkawaew' 'mez'}}} (<abbr class=gl>ai</abbr>) {{{tln 'it (animate; for example, a wagon or canoe) tips over'}}}</p>
    <p><b>Stem:</b> {{{inex 'kōhkawae‑' 'mez'}}} [initial {{{inex 'kōhkā‑' 'mez'}}} {{{tln 'tip over'}}} + {{{inex '‑āwa͞e' 'mez'}}} {{{tln '<abbr class=gl>ai</abbr> final'}}}]</p>
    <p><b>Secondary final:</b> {{{inex '‑makat' 'mez'}}} {{{tln '<abbr class=gl>ii</abbr> verb'}}}</p>
    <p><b>New word:</b> {{{inex 'kōhkawae<b>makat</b>' 'mez'}}} <abbr class=gl>ii</abbr> {{{tln 'it tips over'}}}</p>
    <p class=ex-source>Bloomfield (<a href=#Bloomfield1975>1975</a>: 103)</p>
  </li>

  <li class=ex>
    <p>{{{inex 'cēkataham' 'mez'}}} (<abbr class=gl>ti</abbr>) {{{tln 'he or she sweeps it clear, cleans it with a broom'}}}</p>
    <p><b>Stem:</b> {{{inex 'cēkatah‑' 'mez'}}} [initial {{{inex 'cēk‑' 'mez'}}} {{{tln 'near, next to'}}} (?) + {{{inex '‑atah' 'mez'}}} {{{tln 'by stick'}}}]</p>
    <p><b>Secondary final:</b> {{{inex '‑ka͞e' 'mez'}}} {{{tln '<abbr class=gl>ai</abbr> verb; indefinite action'}}}</p>
    <p><b>New word:</b> {{{inex 'cēkatahe<b>kae</b>w' 'mez'}}} (<abbr class=gl>ai1</abbr>) {{{tln 'he or she sweeps'}}}</p>
    <p class=ex-source>Bloomfield (<a href=#Bloomfield1975>1975</a>: 42)</p>
  </li>

  <li class=ex>
    <p>{{{inex 'wāqnenam' 'mez'}}} (<abbr class=gl>ti</abbr>) {{{tln 'he or she throws light on it, lights it up'}}}</p>
    <p><b>Stem:</b> {{{inex 'wāqnen‑' 'mez'}}} [initial {{{inex 'wāqN‑' 'mez'}}} {{{tln 'light'}}} + {{{inex '‑aen' 'mez'}}} {{{tln 'by hand'}}}]</p>
    <p><b>Secondary final:</b> {{{inex '‑kan' 'mez'}}} {{{tln '<abbr class=gl>n</abbr>; instrument, product, place, etc.'}}}</p>
    <p><b>New word:</b> {{{inex 'wāqnene<b>kan</b>' 'mez'}}} (<abbr class=gl>n</abbr>) {{{tln 'lamp, candle'}}}</p>
    <p class=ex-source>Bloomfield (<a href=#Bloomfield1975>1975</a>: 267)</p>
  </li>

  <li class=ex>
    <p>{{{inex 'sūniyan' 'mez'}}} (<abbr class=gl>n</abbr>) {{{tln 'money'}}}</p>
    <p><b>Stem:</b> {{{inex 'sūniyan‑' 'mez'}}} [initial {{{inex 'sōni‑' 'mez'}}} {{{tln 'silver'}}} + {{{inex '‑ān' 'mez'}}} {{{tln '<abbr class=gl>n</abbr> final'}}} (?)]</p>
    <p><b>Secondary final:</b> {{{inex '‑ikamekw' 'mez'}}} {{{tln '<abbr class=gl>n</abbr>; house, building'}}}</p>
    <p><b>New word:</b> {{{inex 'sūniyan<b>ikamek</b>' 'mez'}}} (<abbr class=gl>n</abbr>) {{{tln 'bank'}}}</p>
    <p class=ex-source>Bloomfield (<a href=#Bloomfield1975>1975</a>: 244) & Sarah Skubitz (4/3/00)</p>
  </li>

</ol>

These examples represent the standard kind of secondary derivation, where a final is added to a stem. Very rarely, you’ll find an analysis in which secondary derivation can be added a medial as well as a final (e.g. Drapeau [1980](#Drapeau1980): 317).

## Formatives {{> backlink/backlink }} {#formatives}

Traditionally, Algonquianists have recognized another level or layer of derivation, saying that components can themselves be made up of more than one piece. There's no standard name for this sub-component element; we've adopted the word <dfn>formative</dfn> for it.

In this project, we believe that what looks like sub-component elements are really historical relics, and should not be treated as synchronically present in a word's analysis. But it's important for the database to be true to the sources we get the data from, so if they include formatives in their analysis, we are entering them.

The types of formatives can include:

- Postradical extensions (also called postinitials)
- Premedials
- Premedial accretions
- Postmedials
- Prefinal accretions

This list (examples appear below) comes from Bloomfield's ([1962](#Bloomfield1962)) grammar of Menominee; other authors may use other terms or include other types. Some of the formative types are claimed to be meaningful; others are just phonological material that attaches to a component (the <dfn>accretions</dfn> and <dfn>extensions</dfn>).

The example below comes from a paper I coauthored on this topic (Macaulay & Salmons [2017](#MacaulaySalmons2017)) and shows where each type of formative attaches to the component it goes with.

<figure class=figure id=fig:men-stem-structure>
  <figcaption class=caption>Menominee Stem Structure (Bloomfield <a href=#Bloomfield1962>1962</a>)</figcaption>
  <div class=fig-item-wrapper>
    <img class=fig-item id=stem-structure src=/images/Menominee_Stem_Structure.png>
  </div>
</figure>

Examples of formatives (all from Bloomfield's analysis of Menominee):

- ### Postradical extensions

  The initial {{{inex 'īqsaw‑' 'mez'}}} {{{tln 'to one side'}}} is found in {{{inex '**īqsaw**ekāpowew' 'mez'}}} {{{tln 'he, she, it (animate) stands bent to one side'}}}. It shows up with the postradical extension {{{inex '‑a͞e' 'mez'}}} in {{{inex '**īqsawa͞e**hkaw' 'mez'}}} {{{tln 'he, she, it (animate) moves to one side'}}}.

- ### Premedials

  This is one of the ways of getting around saying a word can have two medials. Premedials appear as the first "part of a complex medial suffix. Thus, beside {{{inex '‑qkw‑' 'mez'}}} {{{tln 'eye, face'}}}, there is {{{inex '‑ānakeqkw‑' 'mez'}}} {{{tln 'eye'}}}, with {{{inex '‑ānak‑' 'mez'}}} {{{tln 'opening'}}} as a premedial" (Bloomfield [1962](#Bloomfield1962): 381).

- ### Premedial accretions

  The medial {{{inex '‑kamy‑' 'mez'}}} {{{tln 'water, liquid'}}} appears in {{{inex 'tahkī**kami**w' 'mez'}}} {{{tln 'it is cool water'}}}. It appears with a premedial accretion {{{inex 'ā‑' 'mez'}}} in {{{inex 'apīs**ākami**w' 'mez'}}} {{{tln 'it is a black liquid'}}}.

- ### Postmedials

  The medial {{{inex '‑qsahkwan‑' 'mez'}}} {{{tln 'nose'}}} appears in {{{inex 'wīne**qsāhkwan**' 'mez'}}} {{{tln 's/he has a dirty nose'}}} (there's a final vowel which is deleted so that it looks like there's no final, but there is). In {{{inex 'kesī**qsahkwana͞e**ha͞ew' 'mez'}}} {{{tln 's/he wipes his or her nose for him or her'}}} the medial has a postmedial {{{inex '‑a͞e' 'mez'}}} ({{{inex '‑qsahkwana͞e‑' 'mez'}}}).

- ### Prefinal accretions

  The noun {{{inex 'oma͞eqnomenēw' 'mez'}}} {{{tln 'Menominee'}}} can be secondarily derived to {{{inex 'oma͞eqnomenēwe**qnaese**w' 'mez'}}} {{{tln 's/he speaks Menominee'}}} with the final {{{inex '‑qnaese' 'mez'}}} {{{tln 'speak'}}}. But the noun {{{inex 'mōhkomān' 'mez'}}} {{{tln 'white person'}}} becomes {{{inex 'mōhkomān**ēweqnaese**w' 'mez'}}} {{{tln 's/he speaks English'}}} with a prefinal accretion {{{inex 'ēw‑' 'mez'}}} added to the final.

For authors who divide finals into two parts, a concrete part and an abstract part (mentioned above), the prefinal corresponds to the concrete part.

The problem we have with the notion of formative has to do with the definition of <dfn>morpheme</dfn>. A <dfn>morpheme</dfn> is supposed to be the smallest unit of sound and meaning or function. But if components are morphemes, then what are the formatives? Morphemes shouldn't be made up of smaller parts, especially meaningful parts (like with the premedials). But if the formatives are the morphemes, then what status does the component have? If it's not a morpheme, what is it?

Following (Macaulay & Salmons [2017](#MacaulaySalmons2017)), we treat cases in which a component has multiple forms (e.g. one with, one without an accretion) as allomorphs of the same morpheme.

## Deverbal Formations {{> backlink/backlink }} {#deverbal-formations}

<dfn>Deverbal</dfn> in the sense it is used here means "formed from a word" (<em>not</em> formed from a verb).

The traditional Algonquianists also see derivation happening to create morphemes. They very correctly recognize the relationship between full words (or stems or roots) and morphemes, but take it the extra step to say that the morpheme is derived from the word. The problem is, if this is a synchronic operation, where in the grammar could it occur?

For example, Bloomfield believed that a number of finals were derived from stems or words ("deverbal finals"). He cites the word {{{inex 'mahka͞esen' 'mez'}}} {{{tln 'shoe, moccasin'}}} and notes that in a word like {{{inex 'maeqteku**ahkesen**' 'mez'}}} {{{tln 'wooden shoe'}}} we find a final of the form {{{inex '‑ahkaesen' 'mez'}}} {{{tln 'shoe'}}}. For him, the fact that they're similar means the latter is derived from the former---apparently synchronically, although he's (frustratingly) never specific.

Although we believe that this kind of relationship is purely historical, when an author says that something is deverbal, we make a note of it in the database, and note the source, if they give it.

## References {{> backlink/backlink }} {#references}

- Bloomfield, Leonard. 1962. <cite>The Menomini Language</cite>. New Haven: Yale University Press. {#Bloomfield1962}
- Bloomfield, Leonard. 1975. <cite>Menominee Lexicon</cite>. Ed. Charles F. Hockett. Milwaukee Public Museum Publications in Anthropology and History No. 3. {#Bloomfield1975}
- Cowell, Andrew and Alonzo Moss Sr. 2008. <cite>The Arapaho Language</cite>. Boulder: University Press of Colorado. {#CowellMoss2008}
- Drapeau, Lynn. 1980. <cite>Le rôle des racines en morphologie derivationelle</cite>. Recherches linguistiques à Montréal 14:313-326. {#Drapeau1980}
- Frantz, Don & Inge Genee (eds.). 2015–2020. <cite>Blackfoot Dictionary</cite>. [https://dictionary.blackfoot.atlas-ling.ca](https://dictionary.blackfoot.atlas-ling.ca). {#FrantzGenee2015}
- Goddard, Ives. 1990. <cite>Primary and Secondary Stem Derivation in Algonquian</cite>. International Journal of American Linguistics 56(4):449-483. {#Goddard1990}
- Macaulay, Monica. in preparation. <cite>Menominee Reference Grammar</cite>. {#MacaulayPrep}
- Macaulay, Monica and Joseph Salmons. 2017. <cite>Synchrony and Diachrony in Menominee Derivational Morphology</cite>. Morphology 27(2):179-215. {#MacaulaySalmons2017}
- Nichols, John D. 2015. <cite>Ojibwe People's Dictionary</cite>. [https://ojibwe.lib.umn.edu/main-entry/ozhaashisagaa-vii](https://ojibwe.lib.umn.edu/main-entry/ozhaashisagaa-vii). {#Nichols2015}
- O'Meara, John. 1990. <cite>Delaware Stem Morphology</cite>. Montreal, Quebec: McGill University Ph.D. dissertat {#OMeara1990}
- Oxford, Will. 2007. <cite>Towards a Grammar of Innu-Aimun Particles</cite>. M.A. thesis,  Department of Linguistics, Memorial University of Newfoundland. {#Oxford2007}
- Wolfart, H. Christoph. 1973. <cite>Plains Cree: A Grammatical Study</cite>. Transactions of the American Philosophical Society, New Series, Vol 63(5):1-90. Philadelphia: American Philosophical Society. {#Wolfart1973}
{.references-list}
