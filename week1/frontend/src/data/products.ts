export const featuredProducts = [
  {
    id: '1',
    name: 'Syltherine',
    description: 'Stylish cafe chair',
    image: 'https://s3-alpha-sig.figma.com/img/1421/901b/217b5f7ea72cbcd9ce3062c4165744e5?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=eyYsGZ5UAvheZXbmrJVIEIldX6dPrZzxqgEEpfSeE8MU7bvY1c0yemJ5016I8HR5OsMLfqsWNhX8A5xXyFTp3bOGwmUZ5lULMPqlx31F4cLdlWdj~Jib2TAjbSRIxNMXkfyDaoZRwanOQWHks7HaFWijJZzz4cQW-yEdXVYxNdZyvAogW4rrxxGcNxZa0L7epIZoPpXRkuY68i7elV9ygh4Rg4ZYyE5jQiJ56g7fNIN5ftuqA15zCC8zOhDy612dYBZ39RuQMKtk4U2lG8ooA5oEImCa~7vrOAtDNzzYD2PfdIgTPduBIv~7NldJhspDZF3lSpfWdS7gMc375bY75A__',
    price: 2500000,
    originalPrice: 3500000,
    discount: 30,
    badge: {
      text: '-30%',
      type: 'discount' as const
    }
  },
  {
    id: '2',
    name: 'Leviosa',
    description: 'Stylish cafe chair',
    image: 'https://s3-alpha-sig.figma.com/img/1854/87a5/5995b9e58e9a45f2d36eadb93b3ad630?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=O9y5-bRuuQn6IPyFFEQSMJJsdGItuJxlgG8ZiQ83iBaPPLJx3njVcy6aC8rPHqkYEzA8xOORxxPYft9ZTqv6dwHV7kB3sdftzmAPKNbxqaPDWe9rP3F32dflYKUrPEXCcq~Vt~ap1SKW3h2DHgWZc7i9B0BH5l3t8TjoLxQ41F1hZ0IlWMgakmiKrDesVfi62oLze0TmzitXOZ8YLQQoJlvrdjjM~9vzGssD5b67pLiLrgOut6v2b5yfNuqYjEWZEZmO8jBCeTdDBiS~kKY8NswIzBNr4WhXyAucRrLDFJgX0wsfycYpQSghWpAnquiYvHiZ6QRNp65i~~3YhGH0gQ__',
    price: 2500000,
    originalPrice: null,
    isNew: false
  },
  {
    id: '3',
    name: 'Lolito',
    description: 'Luxury big sofa',
    image: 'https://s3-alpha-sig.figma.com/img/4491/a0ea/43eebd52ea72d60650f31030ec4bf7e6?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kcZkkqzDyI635f3bY6RIszsqyxLBXt-VOn4lT4hNw7Vwtw9H6vkuHZFGqORz6GIgb8Se9DiTxswTinOEUsnt9f~vb3UvjWJwdhg3lzDcxcmBsTE8JR8pV~oa-XjMUVncG9LR5RQ7qrbBOxlPrbOV68ifyRG5-kAWjMRJTTWSDXm1BIpP6F2RV8fem937QOXiT~83vHQ24m1vk-1wnWAY0rJMblZYf56yCM4WUGa7f3gZKkIrFr8QavOG0kEpFPB8EZ3~u-ZjCF1ua5MFfA4m6b6Y-Mzc53R8VSnEsIqVO7QkoVlJ6irJTB1JiXGiiBFRt92AJeq05XdaD-dzXTvMeQ__',
    price: 7000000,
    originalPrice: 14000000,
    discount: 50,
    badge: {
      text: '-50%',
      type: 'discount' as const
    }
  },
  {
    id: '4',
    name: 'Respira',
    description: 'Outdoor bar table and stool',
    image: 'https://s3-alpha-sig.figma.com/img/3740/8e44/4bdba3a6bef9d68df2d9a06e32e96c61?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fsu9VlHFjvueNMwvNRNbIRzJIKcCMn6LrVncULC1LuIR4Oo3YokGp1mnreqFJUNb-RYZBzXOxIliuo2-zQ2PzRuu~IM4hbmeDAdwB4TtY1KTeRaQe9pnEY47glYXIEXzN34zUh4-jKMoO37zk5qdL9TqvzudH6y7S0sg6qwbcniMPJDETfk4JIGjLr7TTie1Lh-PIm8byvrgT~Zh4tR85siSlFONadYLUUGdXgC7KplVOa0AuuvITvZ~DLEnagYpbmSaFkxkwCjvmmJc7-lX6TltVOpqIyM8KI87h~DBxuq5VrELzNUlII0pcqoDoPsIPzew3fOOumvpuwcdIVqjTw__',
    price: 500000,
    isNew: true,
    badge: {
      text: 'New',
      type: 'new' as const
    }
  },
  {
    id: '5',
    name: 'Grifo',
    description: 'Night lamp',
    image: 'https://s3-alpha-sig.figma.com/img/01ee/fd24/a8aa07432237436878715846cd38a35f?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TO9vdyJkd-psHV-Kiw9AhG91ys4nrbe-f5Ml1u0DBt46w91avRseB3sy70JUIWYGRcfOVcEaHIwkCgErmuX7GzqobQeNPUMk65cItibTkBZukOELFzhZKB0a2i~dm0srCba6iE-TTMet7X9yyUJB126VhCpUfXRF6Qz70xj9RzgPaUClFI5yhgOzFohbOhVFRpmUx0km8Y-Md2XZA25xPmn2Iph95uJpHCTh7MrvbYemgCW-C5NmjBOi1B4OhVHmX5Fg1lV4aak8rPv5xzqAgSmJVxkukipwPiioc29NO7q~f2R0PCKZGkPvHJIvuHVMZEAO3x9qMCgShbMlJlvFnQ__',
    price: 1500000,
    originalPrice: null
  },
  {
    id: '6',
    name: 'Muggo',
    description: 'Small mug',
    image: 'https://s3-alpha-sig.figma.com/img/0b5e/8500/6615f4968338e0a7004a86529ecf85c9?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Vj0ELLrx5rDwSuIRv3tP40ju1nMRCCtTSwHKvwRCtuX~9ORXlrT-dHpBr-Yqv6Aa~MObniIzdKE4SVI69snDe6sqsU8hjaCmOakJ0rQRyCkJbfgW~xXYn78bN-fcp24NRmhWnSbXxPmiU9n5ClijDkclwW3dKR-ujoJvgBpbkE7OP4EL9PVFclWedfT6nqhZhIWeSPh2ddoeW2zCshPCVez24PiBUGmjXNhYFSJlV9Unfp~ind6tT1p0mOntf1EGeyqSBNfXWZa5fYhIBvsHThYfWsHL7nJaVl5RFIoHYKQvE2pmwq7-5maMPtRSQiSdrn22NOPsk7R-Eff0fq0r7A__',
    price: 150000,
    isNew: true,
    badge: {
      text: 'New',
      type: 'new' as const
    }
  },
  {
    id: '7',
    name: 'Pingky',
    description: 'Cute bed set',
    image: 'https://s3-alpha-sig.figma.com/img/0c0c/9f1d/fb8a0eb09248704cfb20129ac12fd4bb?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tbIxlizYKBRLyxLyPFauP0rk8zEZoKc04JyucAMQf1X~SYqN-Lb-FkRXw8NgEE8Vk0zb6LkxPmgJbn6dz5OWicLcaikGsGwVYtl42xPfN~ZBaR30OUXxztnOd0gAb7crlY742v71LFJfpQG4N5iFwuC3iEQYXbUuMJQgufxjZgsoeTrV7-NktC-w9rTOP6YcFPCmIl3Hhn-CoPx1X8aQhOW8iW7tYkJd0kSFAsNMb6FF45e9C3vUMCTj3T3TCMeoEztfFIyb33~OyXxxcnvdWhXiT6y4aD7vjlUnOddmkmoQNgfJOKYXt~3X05gYvTI8KpUYI62d36sehK58rNjKbQ__',
    price: 7000000,
    originalPrice: 14000000,
    discount: 50,
    badge: {
      text: '-50%',
      type: 'discount' as const
    }
  },
  {
    id: '8',
    name: 'Potty',
    description: 'Minimalist flower pot',
    image: 'https://s3-alpha-sig.figma.com/img/0da1/e0b7/ae335b5f3ec754dd010f7b33ada407ed?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=F2MG~5QQLJIr2odEUucNqaiL47Gi9jA3mkaazrxFj4rH2~VLbKg7CExp1gZOQkZ8zUAei4KxZLCZGY8K6IvByxFbuwOQ2LcgZjA3BrLhTgviC2ARdWlwnWGLVMZhvdzU9Q4J1WB4UZgyIMG4n~gu6UnhfD5h4u77LNlidVPhxW6IRSBM3xS2jsBGjK9Nc236VnTbr8NavxNS2uRdaLv8JG87LzBnnqu9LPVmzwFu69RcAVfJ8sGkz5q5wtR97UObFceuy85t0qIB5-mGwImyVeODBGuqhTxkN~EAahHeaw0CNCgP5BrCTT8aVbXkvMYg-uxdwlfVw8Z-ZPCeMHQ8iw__',
    price: 500000,
    isNew: true,
    badge: {
      text: 'New',
      type: 'new' as const
    }
  }
];