# IDP-Z3
IDP-Z3 is a reasoning engine that can perform a variety of reasoning tasks on knowledge bases in the FO(·) language (IDP-Z3: a reasoning engine for FO(·)).
Reasoning engines enable the Knowledge Base paradigm (Denecker and Vennekens 2008), in which systems store declarative domain knowledge, and use it to solve a variety of problems
# FO(.)
FO(·) (aka FO-dot) is the Knowledge Representation language used by the IDP-Z3 reasoning engine (IDP-Z3: a reasoning engine for FO(·)). It is an extention of first-order logic (FOL), which makes use of operators the following constructs ∧, ∨, ¬, ⇒, ∀, ∃.
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
