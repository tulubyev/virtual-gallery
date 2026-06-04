import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Ticket,
  DollarSign,
  GalleryVerticalEnd,
  Star,
  Clock,
  TrendingUp,
  Heart,
  Eye,
  Award,
  PiggyBank,
  Wallet
} from 'lucide-react';

interface AuctionItem {
  id: number;
  title: string;
  artist: string;
  currentBid: number;
  bidIncrement: number;
  endTime: string;
  image: string;
  bids: number;
  startingPrice: number;
  reserveMet: boolean;
}

interface BidHistory {
  id: number;
  artworkTitle: string;
  amount: number;
  bidder: string;
  time: string;
}

const AuctionParticipantPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([
    {
      id: 1,
      title: 'Абстрактная композиция №1',
      artist: 'Александр Петров',
      currentBid: 12500,
      bidIncrement: 500,
      endTime: '2023-11-25T18:00:00Z',
      image: '/placeholder-artwork.jpg',
      bids: 12,
      startingPrice: 10000,
      reserveMet: true
    },
    {
      id: 2,
      title: 'Городской пейзаж',
      artist: 'Мария Иванова',
      currentBid: 8500,
      bidIncrement: 250,
      endTime: '2023-11-24T15:30:00Z',
      image: '/placeholder-artwork.jpg',
      bids: 8,
      startingPrice: 7000,
      reserveMet: true
    },
    {
      id: 3,
      title: 'Цифровая инсталляция',
      artist: 'Анна Смирнова',
      currentBid: 22000,
      bidIncrement: 1000,
      endTime: '2023-11-26T20:00:00Z',
      image: '/placeholder-artwork.jpg',
      bids: 21,
      startingPrice: 20000,
      reserveMet: false
    }
  ]);

  // Mock data for statistics
  const stats = [
    { title: 'Активные торги', value: '12', change: '+3%' },
    { title: 'Мои ставки', value: '8', change: '+5%' },
    { title: 'Выиграно', value: '3', change: '+2%' },
    { title: 'Потрачено', value: '$42,500', change: '+12%' },
  ];

  // Mock data for bid history
  const bidHistory: BidHistory[] = [
    { id: 1, artworkTitle: 'Абстрактная композиция №1', amount: 12500, bidder: 'Вы', time: '2023-11-20 14:32' },
    { id: 2, artworkTitle: 'Городской пейзаж', amount: 8500, bidder: 'Иван С.', time: '2023-11-19 16:45' },
    { id: 3, artworkTitle: 'Цифровая инсталляция', amount: 22000, bidder: 'Вы', time: '2023-11-18 11:20' },
    { id: 4, artworkTitle: 'Портрет женщины', amount: 15600, bidder: 'Анна К.', time: '2023-11-17 09:15' },
    { id: 5, artworkTitle: 'Морской пейзаж', amount: 7800, bidder: 'Вы', time: '2023-11-16 17:30' },
  ];

  const handlePlaceBid = (itemId: number, amount: number) => {
    setAuctionItems(auctionItems.map(item => 
      item.id === itemId ? { ...item, currentBid: amount, bids: item.bids + 1 } : item
    ));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Участник аукциона</h1>
        <p className="text-muted-foreground">Управление ставками и участие в торгах</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b">
        <button
          className={`pb-3 px-1 ${activeTab === 'dashboard' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Дашборд
        </button>
        <button
          className={`pb-3 px-1 ${activeTab === 'auctions' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('auctions')}
        >
          Аукционы
        </button>
        <button
          className={`pb-3 px-1 ${activeTab === 'bids' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('bids')}
        >
          Мои ставки
        </button>
        <button
          className={`pb-3 px-1 ${activeTab === 'history' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('history')}
        >
          История
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Auctions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Активные торги</CardTitle>
                <Button variant="outline" size="sm">Просмотреть все</Button>
              </div>
              <CardDescription>Текущие аукционы, в которых вы можете участвовать</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auctionItems.slice(0, 3).map(item => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-muted rounded-lg p-2 flex-shrink-0">
                        <GalleryVerticalEnd className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{item.title}</h4>
                          <Badge variant={item.reserveMet ? 'default' : 'secondary'}>
                            {item.reserveMet ? 'Резерв превышен' : 'Резерв не достигнут'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Автор: {item.artist}</p>
                        
                        <div className="flex justify-between items-center mt-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Текущая ставка</p>
                            <p className="font-medium">${item.currentBid.toLocaleString()}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-muted-foreground">Ставок</p>
                            <p className="font-medium">{item.bids}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-muted-foreground">До окончания</p>
                            <p className="font-medium">
                              <Clock className="h-4 w-4 inline mr-1" />
                              {new Date(item.endTime).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={() => handlePlaceBid(item.id, item.currentBid + item.bidIncrement)}>
                              <DollarSign className="h-4 w-4 mr-1" />
                              Сделать ставку
                            </Button>
                            <Button size="sm" variant="outline">
                              <Heart className="h-4 w-4 mr-1" />
                              Следить
                            </Button>
                          </div>
                          
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Моя статистика</CardTitle>
              <CardDescription>Ваша активность на аукционах</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-2" />
                    <span>Выиграно лотов</span>
                  </div>
                  <span className="font-medium">3</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <PiggyBank className="h-5 w-5 text-primary mr-2" />
                    <span>Потрачено</span>
                  </div>
                  <span className="font-medium">$42,500</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Ticket className="h-5 w-5 text-primary mr-2" />
                    <span>Активные ставки</span>
                  </div>
                  <span className="font-medium">8</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-primary mr-2" />
                    <span>Рейтинг</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="ml-1">4.7</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4">
                  <Wallet className="h-4 w-4 mr-2" />
                  Пополнить баланс
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'auctions' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Все аукционы</CardTitle>
              <Button variant="outline">
                <Ticket className="h-4 w-4 mr-2" />
                Мои аукционы
              </Button>
            </div>
            <CardDescription>Список всех активных и предстоящих аукционов</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctionItems.map(item => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="bg-muted aspect-video flex items-center justify-center">
                    <GalleryVerticalEnd className="h-12 w-12 text-primary/20" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>Автор: {item.artist}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Текущая ставка</span>
                        <span className="font-medium">${item.currentBid.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Ставок</span>
                        <span className="font-medium">{item.bids}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">До окончания</span>
                        <span className="font-medium">{new Date(item.endTime).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="pt-3">
                        <Button 
                          className="w-full" 
                          onClick={() => handlePlaceBid(item.id, item.currentBid + item.bidIncrement)}
                        >
                          <DollarSign className="h-4 w-4 mr-2" />
                          Ставка ${item.currentBid + item.bidIncrement}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'bids' && (
        <Card>
          <CardHeader>
            <CardTitle>Мои ставки</CardTitle>
            <CardDescription>Текущие ставки, которые вы сделали</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4">Экспонат</th>
                    <th className="text-left p-4">Автор</th>
                    <th className="text-left p-4">Моя ставка</th>
                    <th className="text-left p-4">Статус</th>
                    <th className="text-left p-4">До окончания</th>
                    <th className="text-left p-4">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {auctionItems.map(item => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">{item.title}</td>
                      <td className="p-4">{item.artist}</td>
                      <td className="p-4 font-medium">${item.currentBid.toLocaleString()}</td>
                      <td className="p-4">
                        <Badge variant={item.bids > 0 ? 'default' : 'secondary'}>
                          {item.bids > 0 ? 'Активна' : 'Ожидание'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(item.endTime).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => handlePlaceBid(item.id, item.currentBid + item.bidIncrement)}
                          >
                            Повысить
                          </Button>
                          <Button size="sm" variant="outline">
                            Отменить
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'history' && (
        <Card>
          <CardHeader>
            <CardTitle>История торгов</CardTitle>
            <CardDescription>Ваши прошлые участия в аукционах</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4">Экспонат</th>
                    <th className="text-left p-4">Ставка</th>
                    <th className="text-left p-4">Участник</th>
                    <th className="text-left p-4">Время</th>
                    <th className="text-left p-4">Результат</th>
                  </tr>
                </thead>
                <tbody>
                  {bidHistory.map(bid => (
                    <tr key={bid.id} className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">{bid.artworkTitle}</td>
                      <td className="p-4">${bid.amount.toLocaleString()}</td>
                      <td className="p-4">{bid.bidder}</td>
                      <td className="p-4">{bid.time}</td>
                      <td className="p-4">
                        <Badge variant={bid.bidder === 'Вы' ? 'default' : 'secondary'}>
                          {bid.bidder === 'Вы' ? 'Выиграно' : 'Проиграно'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AuctionParticipantPanel;