/*
 * Примеры использования компонентов shadcn/ui в проекте виртуальной галереи
 */

// 1. Пример использования карточки с экспонатом
<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Название экспоната</CardTitle>
    <CardDescription>
      Автор: Имя Фамилия, 2023 год
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      Описание экспоната. Здесь может быть краткая информация о произведении искусства, 
      его истории и особенностях.
    </p>
    <div className="flex gap-2 mt-4">
      <Badge>Современное искусство</Badge>
      <Badge variant="secondary">Живопись</Badge>
    </div>
  </CardContent>
</Card>

// 2. Пример использования таблицы с данными
<div className="rounded-md border">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">ID</TableHead>
        <TableHead>Название</TableHead>
        <TableHead>Автор</TableHead>
        <TableHead className="text-right">Год</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">EX-001</TableCell>
        <TableCell>Абстрактная композиция</TableCell>
        <TableCell>Иванов И.И.</TableCell>
        <TableCell className="text-right">2020</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">EX-002</TableCell>
        <TableCell>Городской пейзаж</TableCell>
        <TableCell>Петрова М.В.</TableCell>
        <TableCell className="text-right">2022</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>

// 3. Пример использования диалогового окна
<Button 
  onClick={() => setShowDialog(true)}
>
  Открыть диалог
</Button>

<Dialog open={showDialog} onOpenChange={setShowDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Заголовок диалога</DialogTitle>
      <DialogDescription>
        Описание диалога. Здесь может быть дополнительная информация или форма.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <p>Содержимое диалога</p>
    </div>
    <DialogFooter>
      <Button type="submit">Сохранить</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// 4. Пример использования выпадающего меню
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      Меню <ChevronDown className="ml-2 h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Действия</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Просмотреть</DropdownMenuItem>
    <DropdownMenuItem>Редактировать</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// 5. Пример использования сайдбара
<Sidebar>
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link to="/">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Панель управления
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
  <SidebarContent>
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/galleries">
              <GalleryVerticalEnd className="mr-2 h-4 w-4" />
              Галереи
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/artworks">
              <Image className="mr-2 h-4 w-4" />
              Экспонаты
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  </SidebarContent>
  <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <User className="mr-2 h-4 w-4" />
          Профиль
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
</Sidebar>

// 6. Пример использования формы с полями ввода
<form className="space-y-4">
  <div>
    <Label htmlFor="title">Название экспоната</Label>
    <Input id="title" placeholder="Введите название" />
  </div>
  <div>
    <Label htmlFor="artist">Имя художника</Label>
    <Input id="artist" placeholder="Введите имя художника" />
  </div>
  <div>
    <Label htmlFor="year">Год создания</Label>
    <Input id="year" type="number" placeholder="2023" />
  </div>
  <Button type="submit" className="w-full">Сохранить</Button>
</form>

// 7. Пример использования селекта
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Выберите жанр" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="painting">Живопись</SelectItem>
    <SelectItem value="sculpture">Скульптура</SelectItem>
    <SelectItem value="photography">Фотография</SelectItem>
    <SelectItem value="digital">Цифровое искусство</SelectItem>
  </SelectContent>
</Select>

// 8. Пример использования уведомления
<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Уведомление</AlertTitle>
  <AlertDescription>
    Это пример уведомления с иконкой и описанием.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <TriangleAlert className="h-4 w-4" />
  <AlertTitle>Ошибка</AlertTitle>
  <AlertDescription>
    Это пример уведомления об ошибке.
  </AlertDescription>
</Alert>