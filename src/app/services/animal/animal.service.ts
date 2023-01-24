import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Buddy } from 'src/app/models/buddy';
import { User } from 'src/app/models/user';
import { UserService } from '../auth/user/user.service';
import { IonLoaderService } from '../ion-loader.service';

@Injectable({
  providedIn: 'root'
})

export class AnimalService {
  id: string;
  buddyname: string
  buddyage: number
  buddyGender: string
  buddyBreed: []
  buddyBday: string
  userAnimals = [];
  userAnimalsAdoption = [];
  buddiesInAdoption = []

  actualBreeds: string[]
  hasBreed = false;

  dogBreeds: string[] = [
    "Affenpinscher",
    "Afghan Hound",
    "Aidi",
    "Airedale Terrier",
    "Akbash Dog",
    "Akita",
    "Alano Español",
    "Alaskan Klee Kai",
    "Alaskan Malamute",
    "Alpine Dachsbracke",
    "Alpine Spaniel",
    "American Bulldog",
    "American Cocker Spaniel",
    "American Eskimo Dog",
    "American Foxhound",
    "American Hairless Terrier",
    "American Pit Bull Terrier",
    "American Staffordshire Terrier",
    "American Water Spaniel",
    "Anglo-Français de Petite Vénerie",
    "Appenzeller Sennenhund",
    "Ariege Pointer",
    "Ariegeois",
    "Armant",
    "Armenian Gampr dog",
    "Artois Hound",
    "Australian Cattle Dog",
    "Australian Kelpie",
    "Australian Shepherd",
    "Australian Silky Terrier",
    "Australian Stumpy Tail Cattle Dog",
    "Australian Terrier",
    "Azawakh",
    "Bakharwal Dog",
    "Barbet",
    "Basenji",
    "Basque Shepherd Dog",
    "Basset Artésien Normand",
    "Basset Bleu de Gascogne",
    "Basset Fauve de Bretagne",
    "Basset Hound",
    "Bavarian Mountain Hound",
    "Beagle",
    "Beagle-Harrier",
    "Bearded Collie",
    "Beauceron",
    "Bedlington Terrier",
    "Belgian Shepherd Dog (Groenendael)",
    "Belgian Shepherd Dog (Laekenois)",
    "Belgian Shepherd Dog (Malinois)",
    "Bergamasco Shepherd",
    "Berger Blanc Suisse",
    "Berger Picard",
    "Berner Laufhund",
    "Bernese Mountain Dog",
    "Billy",
    "Black and Tan Coonhound",
    "Black and Tan Virginia Foxhound",
    "Black Norwegian Elkhound",
    "Black Russian Terrier",
    "Bloodhound",
    "Blue Lacy",
    "Blue Paul Terrier",
    "Boerboel",
    "Bohemian Shepherd",
    "Bolognese",
    "Border Collie",
    "Border Terrier",
    "Borzoi",
    "Boston Terrier",
    "Bouvier des Ardennes",
    "Bouvier des Flandres",
    "Boxer",
    "Boykin Spaniel",
    "Bracco Italiano",
    "Braque d'Auvergne",
    "Braque du Bourbonnais",
    "Braque du Puy",
    "Braque Francais",
    "Braque Saint-Germain",
    "Brazilian Terrier",
    "Briard",
    "Briquet Griffon Vendéen",
    "Brittany",
    "Broholmer",
    "Bruno Jura Hound",
    "Bucovina Shepherd Dog",
    "Bull and Terrier",
    "Bull Terrier (Miniature)",
    "Bull Terrier",
    "Bulldog",
    "Bullenbeisser",
    "Bullmastiff",
    "Bully Kutta",
    "Burgos Pointer",
    "Cairn Terrier",
    "Canaan Dog",
    "Canadian Eskimo Dog",
    "Cane Corso",
    "Cardigan Welsh Corgi",
    "Carolina Dog",
    "Carpathian Shepherd Dog",
    "Catahoula Cur",
    "Catalan Sheepdog",
    "Caucasian Shepherd Dog",
    "Cavalier King Charles Spaniel",
    "Central Asian Shepherd Dog",
    "Cesky Fousek",
    "Cesky Terrier",
    "Chesapeake Bay Retriever",
    "Chien Français Blanc et Noir",
    "Chien Français Blanc et Orange",
    "Chien Français Tricolore",
    "Chien-gris",
    "Chihuahua",
    "Chilean Fox Terrier",
    "Chinese Chongqing Dog",
    "Chinese Crested Dog",
    "Chinese Imperial Dog",
    "Chinook",
    "Chippiparai",
    "Chow Chow",
    "Cierny Sery",
    "Cimarrón Uruguayo",
    "Cirneco dell'Etna",
    "Clumber Spaniel",
    "Combai",
    "Cordoba Fighting Dog",
    "Coton de Tulear",
    "Cretan Hound",
    "Croatian Sheepdog",
    "Cumberland Sheepdog",
    "Curly Coated Retriever",
    "Cursinu",
    "Cão da Serra de Aires",
    "Cão de Castro Laboreiro",
    "Cão Fila de São Miguel",
    "Dachshund",
    "Dalmatian",
    "Dandie Dinmont Terrier",
    "Danish Swedish Farmdog",
    "Deutsche Bracke",
    "Doberman Pinscher",
    "Dogo Argentino",
    "Dogo Cubano",
    "Dogue de Bordeaux",
    "Drentse Patrijshond",
    "Drever",
    "Dunker",
    "Dutch Shepherd Dog",
    "Dutch Smoushond",
    "East Siberian Laika",
    "East-European Shepherd",
    "Elo",
    "English Cocker Spaniel",
    "English Foxhound",
    "English Mastiff",
    "English Setter",
    "English Shepherd",
    "English Springer Spaniel",
    "English Toy Terrier (Black &amp; Tan)",
    "English Water Spaniel",
    "English White Terrier",
    "Entlebucher Mountain Dog",
    "Estonian Hound",
    "Estrela Mountain Dog",
    "Eurasier",
    "Field Spaniel",
    "Fila Brasileiro",
    "Finnish Hound",
    "Finnish Lapphund",
    "Finnish Spitz",
    "Flat-Coated Retriever",
    "Formosan Mountain Dog",
    "Fox Terrier (Smooth)",
    "French Bulldog",
    "French Spaniel",
    "Galgo Español",
    "Gascon Saintongeois",
    "German Longhaired Pointer",
    "German Pinscher",
    "German Shepherd",
    "German Shorthaired Pointer",
    "German Spaniel",
    "German Spitz",
    "German Wirehaired Pointer",
    "Giant Schnauzer",
    "Glen of Imaal Terrier",
    "Golden Retriever",
    "Gordon Setter",
    "Gran Mastín de Borínquen",
    "Grand Anglo-Français Blanc et Noir",
    "Grand Anglo-Français Blanc et Orange",
    "Grand Anglo-Français Tricolore",
    "Grand Basset Griffon Vendéen",
    "Grand Bleu de Gascogne",
    "Grand Griffon Vendéen",
    "Great Dane",
    "Great Pyrenees",
    "Greater Swiss Mountain Dog",
    "Greek Harehound",
    "Greenland Dog",
    "Greyhound",
    "Griffon Bleu de Gascogne",
    "Griffon Bruxellois",
    "Griffon Fauve de Bretagne",
    "Griffon Nivernais",
    "Hamiltonstövare",
    "Hanover Hound",
    "Hare Indian Dog",
    "Harrier",
    "Havanese",
    "Hawaiian Poi Dog",
    "Himalayan Sheepdog",
    "Hokkaido",
    "Hovawart",
    "Huntaway",
    "Hygenhund",
    "Ibizan Hound",
    "Icelandic Sheepdog",
    "Indian pariah dog",
    "Indian Spitz",
    "Irish Red and White Setter",
    "Irish Setter",
    "Irish Terrier",
    "Irish Water Spaniel",
    "Irish Wolfhound",
    "Istrian Coarse-haired Hound",
    "Istrian Shorthaired Hound",
    "Italian Greyhound",
    "Jack Russell Terrier",
    "Jagdterrier",
    "Jämthund",
    "Kai Ken",
    "Kaikadi",
    "Kanni",
    "Karelian Bear Dog",
    "Karst Shepherd",
    "Keeshond",
    "Kerry Beagle",
    "Kerry Blue Terrier",
    "King Charles Spaniel",
    "King Shepherd",
    "Kintamani",
    "Kishu",
    "Komondor",
    "Kooikerhondje",
    "Koolie",
    "Korean Jindo Dog",
    "Kromfohrländer",
    "Kumaon Mastiff",
    "Kurī",
    "Kuvasz",
    "Kyi-Leo",
    "Labrador Husky",
    "Labrador Retriever",
    "Lagotto Romagnolo",
    "Lakeland Terrier",
    "Lancashire Heeler",
    "Landseer",
    "Lapponian Herder",
    "Large Münsterländer",
    "Leonberger",
    "Lhasa Apso",
    "Lithuanian Hound",
    "Longhaired Whippet",
    "Löwchen",
    "Mahratta Greyhound",
    "Maltese",
    "Manchester Terrier",
    "Maremma Sheepdog",
    "McNab",
    "Mexican Hairless Dog",
    "Miniature American Shepherd",
    "Miniature Australian Shepherd",
    "Miniature Fox Terrier",
    "Miniature Pinscher",
    "Miniature Schnauzer",
    "Miniature Shar Pei",
    "Molossus",
    "Montenegrin Mountain Hound",
    "Moscow Watchdog",
    "Moscow Water Dog",
    "Mountain Cur",
    "Mucuchies",
    "Mudhol Hound",
    "Mudi",
    "Neapolitan Mastiff",
    "New Zealand Heading Dog",
    "Newfoundland",
    "Norfolk Spaniel",
    "Norfolk Terrier",
    "Norrbottenspets",
    "North Country Beagle",
    "Northern Inuit Dog",
    "Norwegian Buhund",
    "Norwegian Elkhound",
    "Norwegian Lundehund",
    "Norwich Terrier",
    "Old Croatian Sighthound",
    "Old Danish Pointer",
    "Old English Sheepdog",
    "Old English Terrier",
    "Old German Shepherd Dog",
    "Olde English Bulldogge",
    "Otterhound",
    "Pachon Navarro",
    "Paisley Terrier",
    "Pandikona",
    "Papillon",
    "Parson Russell Terrier",
    "Patterdale Terrier",
    "Pekingese",
    "Pembroke Welsh Corgi",
    "Perro de Presa Canario",
    "Perro de Presa Mallorquin",
    "Peruvian Hairless Dog",
    "Petit Basset Griffon Vendéen",
    "Petit Bleu de Gascogne",
    "Phalène",
    "Pharaoh Hound",
    "Phu Quoc ridgeback dog",
    "Picardy Spaniel",
    "Plott Hound",
    "Podenco Canario",
    "Pointer (dog breed)",
    "Polish Greyhound",
    "Polish Hound",
    "Polish Hunting Dog",
    "Polish Lowland Sheepdog",
    "Polish Tatra Sheepdog",
    "Pomeranian",
    "Pont-Audemer Spaniel",
    "Poodle",
    "Porcelaine",
    "Portuguese Podengo",
    "Portuguese Pointer",
    "Portuguese Water Dog",
    "Posavac Hound",
    "Pražský Krysařík",
    "Pudelpointer",
    "Pug",
    "Puli",
    "Pumi",
    "Pungsan Dog",
    "Pyrenean Mastiff",
    "Pyrenean Shepherd",
    "Rafeiro do Alentejo",
    "Rajapalayam",
    "Rampur Greyhound",
    "Rastreador Brasileiro",
    "Rat Terrier",
    "Ratonero Bodeguero Andaluz",
    "Redbone Coonhound",
    "Rhodesian Ridgeback",
    "Rottweiler",
    "Rough Collie",
    "Russell Terrier",
    "Russian Spaniel",
    "Russian tracker",
    "Russo-European Laika",
    "Sabueso Español",
    "Saint-Usuge Spaniel",
    "Sakhalin Husky",
    "Saluki",
    "Samoyed",
    "Sapsali",
    "Schapendoes",
    "Schillerstövare",
    "Schipperke",
    "Schweizer Laufhund",
    "Schweizerischer Niederlaufhund",
    "Scotch Collie",
    "Scottish Deerhound",
    "Scottish Terrier",
    "Sealyham Terrier",
    "Segugio Italiano",
    "Seppala Siberian Sleddog",
    "Serbian Hound",
    "Serbian Tricolour Hound",
    "Shar Pei",
    "Shetland Sheepdog",
    "Shiba Inu",
    "Shih Tzu",
    "Shikoku",
    "Shiloh Shepherd Dog",
    "Siberian Husky",
    "Silken Windhound",
    "Sinhala Hound",
    "Skye Terrier",
    "Sloughi",
    "Slovak Cuvac",
    "Slovakian Rough-haired Pointer",
    "Small Greek Domestic Dog",
    "Small Münsterländer",
    "Smooth Collie",
    "South Russian Ovcharka",
    "Southern Hound",
    "Spanish Mastiff",
    "Spanish Water Dog",
    "Spinone Italiano",
    "Sporting Lucas Terrier",
    "St. Bernard",
    "St. John's water dog",
    "Stabyhoun",
    "Staffordshire Bull Terrier",
    "Standard Schnauzer",
    "Stephens Cur",
    "Styrian Coarse-haired Hound",
    "Sussex Spaniel",
    "Swedish Lapphund",
    "Swedish Vallhund",
    "Tahltan Bear Dog",
    "Taigan",
    "Talbot",
    "Tamaskan Dog",
    "Teddy Roosevelt Terrier",
    "Telomian",
    "Tenterfield Terrier",
    "Thai Bangkaew Dog",
    "Thai Ridgeback",
    "Tibetan Mastiff",
    "Tibetan Spaniel",
    "Tibetan Terrier",
    "Tornjak",
    "Tosa",
    "Toy Bulldog",
    "Toy Fox Terrier",
    "Toy Manchester Terrier",
    "Toy Trawler Spaniel",
    "Transylvanian Hound",
    "Treeing Cur",
    "Treeing Walker Coonhound",
    "Trigg Hound",
    "Tweed Water Spaniel",
    "Tyrolean Hound",
    "Vizsla",
    "Volpino Italiano",
    "Weimaraner",
    "Welsh Sheepdog",
    "Welsh Springer Spaniel",
    "Welsh Terrier",
    "West Highland White Terrier",
    "West Siberian Laika",
    "Westphalian Dachsbracke",
    "Wetterhoun",
    "Whippet",
    "White Shepherd",
    "Wire Fox Terrier",
    "Wirehaired Pointing Griffon",
    "Wirehaired Vizsla",
    "Yorkshire Terrier",
    "Šarplaninac"
  ]
  catBreeds: string[] = [
    'Abyssinian',
    'American Bobtail',
    'American Curl',
    'American Shorthair',
    'American Wirehair',
    'Balinese-Javanese',
    'Bengal',
    'British Shorthair',
    'Comun',
    'Himalayan',
    'Maine Coon',
    'Munchkin',
    'Norwegian',
    'Ocicat',
    'Persian',
    'Russian Blue',
    'Scottish',
    'Siamese',
    'Siberian',
    'Somali',
    'Sphynx',
    'Turkish Angora'
  ]
  pigBreeds: string[] = [
    'Yorkshire',
    'Duroc',
    'Hampshire',
    'Landrace',
    'Vietnamese'
  ]
  birdBreeds: string[] = [
    'African Grey Parrot',
    'Amazon Parrot',
    'Blue-Gold Macaw',
    'Budgie (Parakeet)',    
    'Canary',
    'Cockatiel',
    'Cockatoo',
    'Dove',
    'Fischers Lovebird',
    'Green-Winged Macaw',
    'Lovebird',
    'Macaw',
    'Moluccan Cockatoo',
    'Owl Finch',
    'Song Canary',
    'Umbrella Cockatoo'
  ]
  hamsterBreeds: string[] = [
    'Chinese Hamster',
    'Roborovski Hamsters',
    'Syrian Hamster',
    'Campbells Hamster',
    'Winter White Hamster'
  ]
  rabbitBreeds: string[] = [
    'American Rabbits',
    'American Chinchilla',
    'American Fuzzy Lop',
    'American Sable',
    'Argente Brun',
    'Belgian Hare',
    'Beveren',
    'Blanc de Hotot',
    'Britannia Petite',
    'Californian',
    'Champagne dArgent',
    'Checkered Giant Rabbits'
  ]
  turtleBreeds: string[] = [
    'Red-Eared Slider',
    'African Sideneck Turtle',
    'Eastern Box Turtle',
    'Western Painted Turtle',
    'Mississippi Map Turtle',
    'Common Musk Turtle',
    'Spotted Turtle',
    'Yellow-Bellied Slider'
  ]

  animalsTypes = [
    {
      name: 'dog',
      breeds: this.dogBreeds
    }, 
    {
      name: 'cat',
      breeds: this.catBreeds 
    },
    {
      name: 'pig',
      breeds: this.pigBreeds
    },     
    {
      name: 'bird',
      breeds: this.birdBreeds
    },  
    {
      name: 'hamster',
      breeds: this.hamsterBreeds
    }, 
    {
      name: 'rabbit',
      breeds: this.rabbitBreeds
    }, 
    {
      name: 'turtle',
      breeds: this.turtleBreeds
    },   
    {
      name: 'Mice'
    }
  ]

  constructor(public database: AngularFirestore, private userService: UserService, private ionloaderService: IonLoaderService) { }

  async loadUserBuddies(user: User) {

    await this.database.collection(`/users/${user.id}/buddies/`).get()
    .forEach(snapshot => { // get all buddies 4 that user
      snapshot.forEach(doc => {
          const animal = doc.data() as Buddy
          var index = this.userAnimals.findIndex(x => x.buddyName == animal.buddyName); 
          if(index === -1) {
            this.userAnimals.push(animal)
          }
      })
    })
    console.log('Buddies ', this.userAnimals ,' loaded for user ', user.username)
  }

  getBuddyImage(buddyId: string): Promise<any>{
    let buddypic
    
    return this.database.doc(`/users/${this.userService.user.id}/buddies/${buddyId}`).ref.get().then(snapshot => {
      if (snapshot.exists) {
        let buddy = snapshot.data() as Buddy
        buddypic = buddy.buddyPic
        return buddypic
      } else {
        return 'Error loading image. Please restart.'
      }
    })
  }

  getBuddyContactPhone(buddyId: string) {
    let buddyContactPhone
    return this.database.doc(`/adoption/${buddyId}/`).ref.get().then(snapshot => {
      if (snapshot.exists) {
        let buddy = snapshot.data() as Buddy
        buddyContactPhone = buddy.contactPhone
        return buddyContactPhone
      } else {
        return 'Error loading phone. Please restart.'
      }
    })
  }

  getBuddyContactMail(buddyId: string) {
    let buddyContactMail
    return this.database.doc(`/adoption/${buddyId}/`).ref.get().then(snapshot => {
      if (snapshot.exists) {
        let buddy = snapshot.data() as Buddy
        buddyContactMail = buddy.contactMail
        return buddyContactMail
      } else {
        return 'Error loading mail. Please restart.'
      }
    })
  }

  async loadUserBuddiesAdoption(user: User) {

    await this.database.collection(`/users/${user.id}/inAdoption/`).get()
    .forEach(snapshot => { // get all buddies 4 that user
      snapshot.forEach(doc => {
          const animal = doc.data() as Buddy
          var index = this.userAnimalsAdoption.findIndex(x => x.buddyName == animal.buddyName); 
          // console.log('index ', index, 'for animal', animal.buddyName)
          if(index === -1) {
            this.userAnimalsAdoption.push(animal)
          }
      })
    })
  }

  async loadBuddiesinAdoption() {

    await this.database.collection(`/adoption/`).get()
    .forEach(snapshot => { // get all buddies in adoption
      snapshot.forEach(doc => {
          const animal = doc.data() as Buddy
          var index = this.buddiesInAdoption.findIndex(x => x.buddyName == animal.buddyName); 
          if(index === -1) {
            this.buddiesInAdoption.push(animal)
          }
      })
    })
  }

  deleteBuddy(user: User, buddy: Buddy) {
    return this.database.doc(`/users/${user.id}/buddies/${buddy.id}`).delete().then(() => {
      this.database.doc(`users/${user.id}`).update({nAnimals: user.nAnimals - 1}).then(() => {
        this.userService.user.nAnimals = user.nAnimals - 1 // update value for the ()
      })      
      this.deleteBuddyinArray(buddy);
      this.ionloaderService.autoLoader('Buddy deleted');
    })
  }

  deleteBuddyinArray(buddy: Buddy) {
    this.userAnimals.forEach((value,index)=>{
      if(value.id===buddy.id) {
        this.userAnimals.splice(index,1); // removes element from array this.events
      } 
    });
  }

  setActualBreed(animalType : string) {
    console.log('Set breed ', animalType)
    this.animalsTypes.forEach(x => {
        if (x.name === animalType && x.breeds ) {
          this.actualBreeds = x.breeds
          this.hasBreed = true
        } 
    });
    console.log('Set breed 2', this.actualBreeds)
  }

  updateBuddy(user: User, oldBuddy : Buddy, newBuddy : Buddy) {
    return this.database.doc(`/users/${user.id}/buddies/${oldBuddy.id}`).update(newBuddy).then(() => {

      this.userAnimals.forEach((item, index, array) => { 
        if(array[index].id === oldBuddy.id ) {
          console.log("son iguales ")
          array[index] = JSON.parse(JSON.stringify(newBuddy))

        };
        console.log('array ', this.userAnimals)
        this.ionloaderService.autoLoader('Buddy updated');
      })

  })
}

updateBuddyAdoption(user: User, oldBuddy : Buddy, newBuddy : Buddy) {
  return this.database.doc(`/adoption/${oldBuddy.id}/`).update(newBuddy).then(() => {

    this.userAnimalsAdoption.forEach((item, index, array) => { 
      if(array[index].id === oldBuddy.id ) {
        console.log("son iguales ")
        array[index] = JSON.parse(JSON.stringify(newBuddy))

      };
    })

      this.buddiesInAdoption.forEach((item, index, array) => { 
        if(array[index].id === oldBuddy.id ) {
          console.log("son iguales ")
          array[index] = JSON.parse(JSON.stringify(newBuddy))
  
        };
      console.log('array ', this.buddiesInAdoption)
      this.ionloaderService.autoLoader('Buddy updated');
    })
    this.database.doc(`/users/${user.id}/inAdoption/${oldBuddy.id}`).update(newBuddy)
  })
}

}