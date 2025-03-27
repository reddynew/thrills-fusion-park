
import React from 'react';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

interface SocialPost {
  id: number;
  username: string;
  userAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
}

const SocialFeed = () => {
  const socialPosts: SocialPost[] = [
    {
      id: 1,
      username: "adventure_seeker",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&fit=crop&q=80",
      image: "https://images.unsplash.com/photo-1582828462913-ac3e9fc909af?w=800&fit=crop&q=80",
      caption: "Conquering the climbing wall at @thrillsfusion! 🧗‍♂️ #AdventureTime #ThrillsFusion",
      likes: 243,
      comments: 18
    },
    {
      id: 2,
      username: "family_fun_times",
      userAvatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&fit=crop&q=80",
      image: "https://images.unsplash.com/photo-1525183376982-66dc07918b96?w=800&fit=crop&q=80",
      caption: "Best family day ever at Thrills Fusion! The kids loved the trampolines! #FamilyMemories #ThrillsFusion",
      likes: 187,
      comments: 12
    },
    {
      id: 3,
      username: "extreme_sports_lover",
      userAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&fit=crop&q=80",
      image: "https://images.unsplash.com/photo-1554224311-beee415c201e?w=800&fit=crop&q=80",
      caption: "That feeling when you're flying through the air on the zipline! Thanks @thrillsfusion #AdrenalineJunkie",
      likes: 319,
      comments: 28
    },
    {
      id: 4,
      username: "weekend_warrior",
      userAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&fit=crop&q=80",
      image: "https://images.unsplash.com/photo-1643208589889-0735ad7218f0?w=800&fit=crop&q=80",
      caption: "VR gaming at Thrills Fusion is next level! Felt like I was in another world 🎮 #GamingExperience #ThrillsFusion",
      likes: 205,
      comments: 15
    }
  ];
  
  return (
    <section id="social" className="relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title relative inline-block">
            Social Media
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-secondary rounded-full"></div>
          </h2>
          <p className="section-subtitle">
            Join our community and share your experiences at Thrills Fusion
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPosts.map((post, index) => (
            <div 
              key={post.id} 
              className="glass-card rounded-xl overflow-hidden animate-fade-in card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Post header */}
              <div className="flex items-center p-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                  <img src={post.userAvatar} alt={post.username} className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-medium">{post.username}</span>
                <Instagram className="w-4 h-4 ml-auto text-primary" />
              </div>
              
              {/* Post image */}
              <div className="aspect-square overflow-hidden">
                <img 
                  src={post.image} 
                  alt="Social media post" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                />
              </div>
              
              {/* Post content */}
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className="flex items-center mr-4">
                    <Heart className="w-5 h-5 mr-1 text-secondary" />
                    <span className="text-sm">{post.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-1" />
                    <span className="text-sm">{post.comments}</span>
                  </div>
                </div>
                <p className="text-sm">
                  <span className="font-medium mr-1">{post.username}</span>
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-semibold transition-transform duration-300 hover:scale-105"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialFeed;
