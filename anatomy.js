'use strict';
const bcit=(n,short,title,desc,alt,targets,opts={})=>({
  image:'media/specimen-'+n+'.jpg',width:1200,height:opts.height||800,
  short,title,desc,alt,credit:'BCIT specimen photograph · image '+n+' · '+opts.specimen,targets,...opts
});
const stages=[
bcit('12','Intact fish','Survey the whole fish','The head is to the right and the tail is to the left. This specimen is tilted with its belly facing toward the top of the photograph.','Whole yellow croaker on a black tray, with its head at right.',[
 ['Eye',77.2,56.4,2.4,3.6,'Find the round gold ring around a dark pupil on the head.','The eye detects light and forms images.','Both have vertebrate eyes with lenses and retinas.'],
 ['Naris (olfactory opening)',80,57.8,1.3,2.3,'Find the tiny dark opening immediately in front of the eye.','The naris admits water to the olfactory system for smell.','Pig nostrils serve olfaction and also lead into the respiratory airway.'],
 ['Mouth',81.6,52.9,1.6,3,'Look for the yellow-edged seam at the tip of the snout.','The mouth takes in food and also admits water for gill ventilation.','The pig mouth receives food and leads to the pharynx; it does not pump water over gills.'],
 ['Operculum (gill cover)',69,51.4,4.1,5,'Look behind the eye for a broad, shiny bony plate.','The operculum covers the gills and helps move water across them.','Pigs have no operculum.'],
 ['Pectoral fin',57.4,44.8,5.8,2.6,'Find the flat yellow fin on the side of the body just behind the gill cover.','The paired pectoral fins help with steering and braking.','Compare these paired appendages with the forelimbs at the shoulder girdle.'],
 ['Lateral line',44.5,53,8,1.6,'Find the faint curved track along the flank, away from the fin edges.','The lateral line detects local water motion and vibrations.','Pigs lack a lateral line.'],
 ['Caudal fin',5.4,53.7,5.0,5.8,'Look for the broad ray-supported tail fin at the far left.','The caudal fin helps generate thrust.','The pig has a vertebrate tail but no fin for swimming propulsion.'],
 ['Dorsal fin',26.5,60.6,9,2.8,'Look along the lower-left back edge of the photo for the long flattened fin.','The dorsal fin stabilizes the fish against rolling.','The pig has a dorsal surface but no dorsal fin.'],
 ['Anal fin',26,44.8,3.8,2.7,'Look on the upper-left belly edge, forward of the tail, for a small fin.','This unpaired ventral fin helps stabilize the fish.','Pigs have an anus but no anal fin.'],
 ['Scales',46,62,8,5,'Find an unbroken patch of overlapping plates low on the flank, away from the lateral line.','Overlapping scales protect the body while allowing it to bend.','Pig skin has hair follicles and lacks this covering of overlapping bony scales.']
],{specimen:'yellow croaker'}),
bcit('13','Body wall','Open the abdominal wall','Slide to reveal the opened view. The large yellow organ dominates the first view into the cavity. The gill region is also exposed at the head.','Yellow croaker with body wall opened, showing a large yellow ovary and exposed gill tissue.',[
 ['Body-wall muscle',48,40.5,9,4,'Look along the pale cut rim above the cavity.','Skeletal muscle forms part of the body wall and moves the trunk.','The fetal pig also has layers of skeletal muscle in its abdominal wall.'],
 ['Ovary',48,66,13,8,'Find the large golden sac occupying much of the cavity.','The ovary produces egg cells; mature fish ovaries may fill much of the body cavity.','Female fetal pigs also have ovaries, which lie near the ends of the uterine horns.'],
 ['Gills',79,52,4.1,6,'Look near the head for red-brown, ridged tissue beneath the gill cover.','Gills exchange oxygen and carbon dioxide with water.','Lungs exchange gases after birth. Before birth, gas exchange occurs across the placenta.'],
 ['Liver',67,48,3.8,4,'Look for a pale lobe in front of and above the golden ovary, just behind the gill region.','The liver produces bile and processes and stores nutrients.','The fetal pig has a large, lobed liver immediately behind the diaphragm.']
],{specimen:'female yellow croaker',action:'Open abdominal wall',pull:'Pull back the body wall'}),
bcit('15','Digestive tract','Move the ovary aside','Compare the folded yellow ovary with the narrow tube and the elongated pink stomach now visible underneath.','Close view of a yellow croaker with the ovary displaced and digestive organs exposed.',[
 ['Stomach',38,58,10,3.5,'Find the long pink sac crossing the exposed yellow ovarian tissue.','The stomach holds food and begins chemical digestion.','The fetal pig stomach is a muscular sac tucked partly under the liver.'],
 ['Intestine',42,79,4.7,3.0,'Follow the slender tube lying diagonally across the lower part of the photograph.','The intestine digests food and absorbs nutrients.','The fetal pig has a coiled small intestine and a distinct large intestine.'],
 ['Ovarian blood vessels',19.2,23,4,6,'Look for branching red lines on the golden lobe folded up at the left.','Blood vessels supply the ovary with oxygen and nutrients.','Blood vessels also supply fetal pig ovaries and other developing organs.']
],{specimen:'female yellow croaker',action:'Move ovary aside',pull:'Draw the ovary aside'}),
bcit('25','Dorsal sac','Lift the digestive tract','An alternate view of a female yellow croaker shows the dorsal sac and organs beside the stomach. The head is toward the right.','Close-up of the opened abdomen showing a long silvery sac and displaced organs.',[
 ['Swim bladder',32,36.5,13,4,'Find the long, silvery gray sac against the back wall, above the yellow ovarian tissue.','The swim bladder helps regulate buoyancy.','Pigs lack a swim bladder. A urinary bladder stores urine and is a different organ.'],
 ['Pyloric ceca',59,55,6.2,4.6,'Find the pale cluster of short finger-like tubes near the stomach.','Pyloric ceca are blind pouches near the stomach outlet that contribute to digestion and absorption.','The pig cecum is a pouch at the small-to-large intestine junction, a different location.'],
 ['Spleen',43,40,3.4,2.2,'Look for the narrow dark lobe just below the silvery sac, near the middle of the view.','The spleen helps filter blood and supports immune function.','The pig spleen is a flattened organ along the stomach’s greater curvature.']
],{height:900,specimen:'female yellow croaker',action:'Lift digestive tract',pull:'Move the digestive tract out of the way'}),
bcit('18','Deep wall','Expose the dorsal body wall','The view now shows the dorsal wall after the swim bladder is displaced. Use the long axis of the cavity to orient the forceps.','Opened yellow croaker after removal of the ovaries, with an exposed dark strip along the dorsal wall.',[
 ['Kidney',23.5,46,14,2.6,'Look for dark elongated tissue against the dorsal wall, above the gut.','The kidney helps regulate water and salts and excrete wastes.','Fetal pigs have paired, bean-shaped kidneys against the dorsal abdominal wall.'],
 ['Displaced swim bladder',19,59,10,3.8,'Look for the long pale sac pulled down just below the dark kidney strip.','Moving the swim bladder exposes the kidney against the dorsal wall.','To see the fetal pig kidneys, move the intestines away from the dorsal wall.']
],{specimen:'yellow croaker, ovaries removed',action:'Expose the kidney',pull:'Draw the swim bladder aside'}),
bcit('04','Gill close-up','Separate a gill arch','Examine the isolated gill from another bony fish specimen. Compare the thick support with the projections on either side.','Isolated gill arch on a dark tray, with two different rows of projections.',[
 ['Gill arch',52,38,9,3,'Find the thick, pale, curved support between the two fringes.','The arch supports the filaments and the rakers.','The pig has embryonic pharyngeal arches, but they do not develop into functional gills.'],
 ['Gill filaments',52,30,12,4.5,'Find the soft, reddish outer fringe above the curved support.','Filaments carry fine lamellae that increase the surface area for gas exchange.','Pig lungs use alveoli to increase the area for gas exchange after birth.'],
 ['Gill rakers',52,49,9,4.5,'Find the slender, pointed projections on the inside of the curved support.','Gill rakers help keep food and other material from passing out over the gills.','Pigs have no gill rakers.']
],{height:900,specimen:'isolated gill',action:'Inspect gill close-up'}),
{
 image:'media/perch-internal.png',width:450,height:338,short:'Perch comparison',title:'Compare a second fish',
 action:'Examine yellow perch',desc:'Switch to a male yellow perch. The letters are reference marks. Touch the tissue at the end of a leader line; when a letter sits directly on a structure, target the tissue around it.',
 alt:'A male yellow perch dissection photograph with lettered reference marks.',
 credit:'Yellow perch specimen photograph · Jon Houseman · Wikimedia Commons',
 targets:[
 ['Atrium (auricle)',7,56.1,2.1,2.2,'Look for the small, thin-walled heart region just below the gills, at the far left.','The atrium receives blood before it passes into the ventricle.','The pig has a right and a left atrium; the fish shown has one atrium.'],
 ['Ventricle',11.8,58.7,2.6,2.2,'Find the muscular heart chamber just to the right of the atrium and left of the cut liver.','The ventricle pumps blood toward the gills through the outflow tract.','The pig has two ventricles. After birth the right pumps toward the lungs and the left toward the body.'],
 ['Testis',75.2,69,10,5,'Find the large pale, oval reproductive organ in the posterior cavity.','The testis produces sperm. Compare its position and texture with the earlier ovary.','Male pigs also have testes; their position changes as they descend during development.'],
 ['Urinary bladder',90.4,59.5,2.5,2.4,'Find the small sac indicated near the far-right end of the cavity, just above the testis.','The urinary bladder collects urine. It is separate from the swim bladder.','The fetal pig bladder lies between the umbilical arteries along the ventral body wall.']
 ]
}
];
