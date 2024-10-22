# IDP-Z3
IDP-Z3 is a reasoning engine that can perform a variety of reasoning tasks on knowledge bases in the FO(·) language (original IDP-Z3 paper).
Reasoning engines enable the Knowledge Base paradigm (Denecker and Vennekens 2008), in which systems store declarative domain knowledge, and use it to solve a variety of problems
# FO(.)
FO(·) (aka FO-dot) is the Knowledge Representation language used by the IDP-Z3 reasoning engine (original IDP-Z3 paper). It is an extention of first-order logic (FOL), which makes use of operators the following constructs ∧, ∨, ¬, ⇒, ∀, ∃.
The FO(.) language consists of, at least, a vocabulary and a theory. The vocabulary is used to describe what symbols will be used in the theory. The theory consists of rules that apply to the symbols. The structure, which is optional, describes a single, specific situation. A quick and easy example to make this clear:
Let's say you wanted to represent when a person can speak and read. The rules would be the following:
- the person should be at least 1 year old to be able to speak
- the person should be at least 6 years old to be able to read
To represent this in FO(.) there should be a type Person which represents the people that we would like to check, a function to check the age of a person and two predicates to check whether a person can speak or read. This should come in the vocabulary V.
The rules should be implemented in the Theory T which makes use of the previously defined vocabulary V. In this example the rules are implemented as definitions, a new and more clear way to represent rules. They can be interpreted as implications. These defenitions can be read as following:
- voor elke persoon geldt dat deze kan lezen als en slechts als deze kan praten en deze minstens 6 jaar oud is.
- voor elke persoon geldt dat deze kan praten als en slechts als deze minstens 1 jaar oud is.
Buiten de definities wordt nog een extra regel beschreven om ervoor te zorgen dat een persoon geen negatieve leeftijd kan hebben:
- voor elke persoon geldt dat de leeftijd van die persoon minstens 0 jaar moet zijn.
Als we deze regels specifiek zouden willen toepassen op drie personen, bijvoorbeeld Tibo, Luca en Daan, kunnen we 
