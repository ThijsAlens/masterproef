# Alternatives for \fodot
Given that \fodot is not very user-friendly, it is necessary to explore other options for more accessible interfaces. In this section, alternative options are considered in the context of home automation. Since this exploration is limited to the home automation domain, some options may not be suitable, while others may be better.

## DMN
A Decision Model and Notation (DMN) is a user-friendly way to describe decision logic. It is managed by the Object Management Group (OMG). Its strength lies in the fact that it does not require a knowledge expert (someone familiar with DMN). Instead, a domain expert can effectively use DMN to model and automate their decisions. A DMN has two main components:
\begin{itemize}
	\item Decision Requirements Diagram (DRD)
        \item Decision Tables
\end{itemize}
### Decision Requirements Diagram
A DRD is a graph-like structure that represents how a decision should be made. It includes input fields (rounded boxes) that provide the system with data needed for making decisions. The squared boxes denote decisions. In the figure below (DMN\_DRD-example) are two input fields ("temperature" and "Is someone home") and one decision ("Turn the heater on").
### Decision Tables
A Decision Table is a way to describe a decision. It defines the output based on a set of input variables. An example of such a table can be found below (DMN\_DT-example).
### Pro's and con's
The main advantage of using a DMN is its clarity and user-friendliness. The user does not need any programming knowledge or understanding of how DMN works to use or model with it effectively. However, a significant drawback is its limited capabilities. When the user attempts to describe more complex situations, it can quickly become very unreadable, so much so that some solutions to those situations fail to meet DMN’s readability goals.
### cDMN
cDMN is an extension of DMN that addresses the shortcomings of standard DMN by introducing constraint modeling, quantification, types, and functions. Although this makes DMN more complex, it is far more readable than a complex, standard DMN. There is already a cDMN-editor in the online IDP-Z3 IDE.

## CNL
A Controlled Natural Language (CNL) is a subset of a natural language that is strictly defined. This allows it to be understood by both a computer and a human. A CNL consists of two parts:
\begin{itemize}
	\item A subset of a lagnuage used as "syntax" 
        \item A parsing engine that can translate the language to a language the computer can understand
\end{itemize}
IDP-Z3 has its own natural language (NL), which can be used in its web IDE and, more importantly, in its interactive consultant. This thesis will use this as an example.
### The IDP-Z3 CNL
IDP-Z3 has its own CNL, which is used to explain certain behaviors of a model. Technically, you could also write the \fodot description in CNL, but this is not commonly done. As shown in the screenshot below, the interactive consultant tries to explain to the user that Luca cannot read because of a rule. The rule is that a person needs to be at least 6 years old to be able to read and talk, which, in this case, Luca does not meet (she is 4 years old). This explanation is useful, but it still requires some understanding of FO symbols, which is not ideal.
The example below shows the CNL as a replacement for \fodot. While it is more readable, there is still a clear reference to the \fodot language. Normally, one wouldn't say "for all p in Person," but "for every Person p." While the second phrasing is clearer for humans, the order change makes it so the computer cannot understand it.
### Pro's and con's
A CNL allows the user to create easy-to-read code because it uses a subset of a known language. However, it is not the easiest to write due to its strictness with the ordering of words, which can introduce ambiguity. Two structures that seem the same to us may be interpreted differently by the computer.

## Block-based editor
A block-based editor is a user-friendly way to write software using blocks. This allows the user to avoid memorizing syntax since the blocks are provided, and the user does not need to know the syntax rules, because the blocks visually show what is possible and what is not. In other words, syntax errors are non-existent, allowing the user to fully focus on what the application should do, rather than how to write it in a certain language. The downside of block-based programming is the space required for the blocks. The workspace can become disorganized as projects grow larger. A well-known example of this is Scratch, a block-based interface for JavaScript. It allows users to create programs in a visual workspace, while processing the blocks into runnable JavaScript code.
### \fodot block-based editor
There already exists a block-based editor for \fodot (A structured, block-based editor for FO(.), with translations to IDP-Z3 syntax). It uses Blockly, a block-based editor developed by Google. It has two components:
\begin{itemize}
	\item A workspace where blocks can be placed
	\item A generator where blocks are translated to a textual representation (in this case \fodot)
\end{itemize}
This is, however, too complex for what is needed in home automation. It works for the entire \fodot language, but it does provide a good baseline to start from.


## DMN
Decision Model and Notation
Two components:
	Decision Requirements Diagram
	Decision Tables
(S-)FEEL language is used to represent these decision models
	S-FEEL is easy to use by domain experts (no knowledge expert required)
    FEEL is more capable and thus more complex (knowledge expert is required)
#### cDMN
extentie voor DMN
## ACE (CNL)
handcrafted cnl vs ace
Attempto Controlled English
Natural controlled language created to bridge the gap from natural english and first order logic. The language is English that is narrowed down so it is preciesly definedwithout ambiguaty, vagueness and potential inconcistency.
Two components:
	ACE -> language
	APE -> parsing engine who translates to DRS (variant of first order logic)

## block-based editor
Blockly by google
very easy to use and learn
customizable for any language using python
synchronous translation while editing
possible to embed in web-app
no syntax-errors because you visually see which blocks don't fit

workspace = place to connect blocks
generator = parser to textual representation

tabelletje dat vergelijkt


### TO DO
de drie tegen elkaar op zetten voor onderzoek

Gedaan
Labo
Planning
probleemstelling
doel


probleem zelf
wat doen
	IDP
    Gebruiksvriendelijk
probleemstelling
	IDP kiezen
    UI
    Hoe in home assistent
Wat is het beste voor home-automation

Specifiek teksten in planning
IDP-implementatie met basis van home-automation

Titels

###Lezen
	Home-automation
###Schrijven
	context
    probleemstelling
    doelstellingen
andere mp lezen
	Wiliam dumez


## 
expressiviteit yaml vs idp
geen protocols bespreken
voorbeeld HA
idp vermelden in intro
IDP makkelijker maken door subset

## HA

### Wat is het, voorbeeld, wat is er al

### Automatisatie

## IDP

### Wat is IDP
paradigma, checken van online editor, meer te doen met kennisbank
### Wat is FO(.)

### Alternatieven talen

#

drie talen vergelijken







