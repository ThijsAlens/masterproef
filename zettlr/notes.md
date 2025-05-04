# notes
verschillende manieren uitwerken en tegen elkaar op te zetten
voorbeeldje maken
	verschillende devices
	vocabulariums maken
	welke regels zijn mogelijk per voc
ontology home automation
blokjes maken die moeilijk zijn in IDP, weg te moffelen in js


Default waarde geven
Verschil tss 1 en 2
	1 is het mogelijk om te inereren of een Device een soort device is, 2 niet mogelijk

Weinig tot geen types wel predicaten
	weinig features van FO(.)
	veel werk + onleesbaar

Hetzelfde ma met Area -> Bool
	beter want device in meerdere areas

Vocabularias voor en nadelen
We kiezen dit of dat
Blockly uittekenen
blockly downloaden
state of the art

demo in thesis

evaluatie



# 10/03

intro state of the art nog is nalezen
UI is echt wel voor SWRL, die dus niet echt gebruiksvriendelijk is
YAML is niet the most userfriendly voor mensen die HA willen doen, bla bla… (niet te hard)

intro chapter 4, zinnen aaneen koppelen
the fo(.) description -> specification
eerste mogelijke manier meer descriptief
no way to quantify over devices
Extra chapter om te beschrijven wat users zouden willen, niet perse in fodot termen
FOdot niet indeteren
second vocabulary "we explored" - gwn weg
all instances of device… - raar verwoord
Vocabularium bepaald de theorie bovenaan


dingen zeggen over kamers van hetzelfde type
meer variatie in de devices
3de optie nodig?


# 18/03
hdstk 3 als intro van hoofdstuk 4
lijst aan regels die de user kan uitvoeren, wat willen wij dat een gebruiker kan uitdrukken + terugverwijzen. 5 a 8 regels verzinnen.
limitaties voor fodot schrijven, bv temporale logica. In de keuken lopen vanuit living doe dan dat, als je uit de living komt, dan iets anders.
hoe tijd definieren?

# 26/03
exclusiviteit voor state groups kan niet in IDP-Z3, maar kan ook niet voorkomen worden in Blockly omdat het een blokje is.

# 1/04 voorbereiding
fodot -> relevance
DMN -> DRD
CNL -> pros and cons
SOTA structure
3.1 devices states??
onderste deel p21
3.1 Home automation description -> rules
3.2 vocabulary + theorie?

# 22/04
buisiness logic
vragenlijstje
string en int device gebruiken
regels aanpassen zodat beide werken
LZ-based compression
4 mei klaar.

devices met meerdere states en numbers niet mogelijk, vermelden.
regels in thesis modeleren.
meerdere inputs.

THESIS
not the most intuitive way wat verzachten (p20)
niet based on maar effectief eerste orde logica (p20)
chapter3 user wat anders verwoorden
begin reas and devices
This is a great way to make the user feel more comfortable with the system (te hard)
sence -> sense
3.2 blokjes zo kort mogelijk bij IDP-Z3 houden zodat we de volledige cappaciteiten van de solver gebruikt kunnen worden. 
De structuur van blockly minder uitleggen
deviceType anders formateren
this is done so in states
figuren nog is bezien, kloppen niet helemaal
The theory part of the FO(·) description is there so, while using the Interactive Consultant, the user can only select the states of the devicetype, not every state. (nog zeggen wrm we ze nodig hebben en wrm we een regel hebben om de states in de IC te beperken. Ook zeggen wrm niet gwn aparte states in vocabularium)
running example doorheen uitleg van de blokjes en dan achteraf IC






