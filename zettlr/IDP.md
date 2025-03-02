# IDP-Z3
IDP-Z3 is a reasoning engine that can perform a variety of reasoning tasks on knowledge bases in the FO(·) language (IDP-Z3: a reasoning engine for FO(·)). The idea is to provide knowledge (in the form of FO(.)) that is interpreted by the IDP-Z3 system to produce an output, which can be lots of things thanks to the knowledge based paradigm.
## The knowledge based paradigm
The knowledge based paradigm states that the knowledge base of a sertain domain should be seperated from its inference tasks (interpretations). This implies that the knowledge could be re-used for multiple use cases in the same domain. For example:
The knowledge states that a sertain number needs to be greater then 7. Interpretations could be:

- 5 is not greater then 7 (it checks if a given value complies with the knowledge)
- 8, 9, 10, 11, 12… (generates models that comply with the knowledge)
- …

In this example the knowledge is used for 2 interpretations (more are possible see below). When this would have been described in an imperative programming language, to seperate programs would have been nessecairy for this problem. This is where the power of a knowledge based system lies.

It is explained below with simple examples, it can of course handle much more complex rules.
- It can produce models based on the knowledge that is provided (model expansion)
    - It is defined that a person must be between 0 and 100 years old. IDP-Z3 can provide models where persons are 1, 4, 40, 99… years old.
 - It can understand links between types (propagation)
     - It is defined that a window can not be open if the heating is on. IDP-Z3 can work out that if the heating is off, the window can be open.
- It can explain why a sertain model can exist (explanation)
    - EX?
 - It can optimise situations (optimisation)
     - It is defined that a sertain number must be greater then 2 and must be devisable by 7. IDP-Z3 can work out that the minimal value of that number is 7.
- It can check if some knowledge is redundend (relevance)
    - It is defined that a sertain number must be positive, greater then 5 and greater then -3. IDP-Z3 can work out that the last rule is redundend.
## online editor
screenshot van de online editor
In the image above, the online editor of IDP-3 is shown. This editor enables the usser to test their written knowledge. Using the example described in section \fodot, there is a way to test the written knowledge.
when putting in an age for Luca, let's say 4, the model adapts itself to the new situation. Luca can't read, but can speak. This is forced, because when the user would like to change it so Luca can read, the editor gives an explanation of why she can't read (see screenshot below).

The online editor thus functions as two thing. It can be used to check whether the knowledge is correct, and it can provide the user with usefull feedback as to why a sertain model can't exist.


Reasoning engines enable the Knowledge Base paradigm (Denecker and Vennekens 2008), in which systems store declarative domain knowledge, and use it to solve a variety of problems.
# FO(.)
FO(·) (aka FO-dot) is the Knowledge Representation language used by the IDP-Z3 reasoning engine (IDP-Z3: a reasoning engine for FO(·)). It is an extention of first-order logic (FOL), which makes use of operators the following constructs ∧, ∨, ¬, ⇒, ∀, ∃ (tabelletje).
The FO(.) language consists of, at least, a vocabulary and a theory. The vocabulary is used to describe what symbols will be used in the theory. The theory consists of rules that apply to the symbols. The structure, which is optional, describes a single, specific situation. A quick and easy example to make this clear:
Let's say you wanted to represent when a person can speak and read. The rules would be the following:
- the person should be at least 1 year old to be able to speak
- the person should be at least 6 years old to be able to read
To represent this in FO(.) there should be a type Person which represents the people that we would like to check, a function to check the age of a person and two predicates to check whether a person can speak or read. This should come in the vocabulary V.
The rules should be implemented in the Theory T which makes use of the previously defined vocabulary V. In this example the rules are implemented as definitions, a new and more clear way to represent rules. They can be interpreted as implications. These defenitions can be read as following:
- For every person, it holds that they can read if and only if they can speak and are at least 6 years old.
- For every person, it holds that they can speak if and only if they are at least 1 year old.
Outside of the definitions, an additional rule is described to ensure that a person cannot have a negative age:
- For every person, it holds that they must be at least 0 years old.
If these rules were to be applied specifically to three individuals, for example, Tibo, Luca and Daan, this particular situation can be described within the structure. By not specifying the ages of the individuals, this can be interpreted by the reasoning engine (in this case, IDP-Z3).

The output of the reasoning engine gives possible models. These models all comply with the theory that was provided. It also shows that the reasoning engine has put in some values for the ages of the persons, altough this was never specified in the FO(.)-description. This is the power of splitting the knowledge (FO(.)-description) and the interpretation (done by IDP-Z3). One knowledge base (KB) can be used for multiple purpusses. It can be used to generate models (like in the example), it can be used to check whether a model is valid, it can be used to teach a user the toughtprocess behind a sertain dissicion… " The KB is ”only” a formal representation of declarative properties of the domain. This imposes a strong requirement on the KB language (FO(.)): its expressions should be interpretable as (informal) propositions about the domain, and this interpretation, its informal semantics, should be as clear, precise and objective as possible" (Building a Knowledge Base System for an integration of Logic Programming and Classical Logic). 
This is in strong contrast to declarative programming frameworks. When using such a framework, all the different operations (generation, validation, explaining...) must be programmed seperatly. On top of that, if a change was to occur, all the programs have to be rewritten, unlike with a split KB and interpretation, where only the KB must be adjusted.

$\Rightarrow$

constraints dat verder gaan dan implicaties
logische of die geinterpreteerd wordt door idp-z3
conflicting rules
validation (simulatie)
