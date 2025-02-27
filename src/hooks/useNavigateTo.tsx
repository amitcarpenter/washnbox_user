import { useNavigation } from '@react-navigation/native';

const useNavigateTo = () => {
    const navigation = useNavigation();

    return (name: string) => {
        console.log("Screen name =>>>", name);
        navigation.navigate(name as never); // `as never` helps with TypeScript complaints
    };
};

export default useNavigateTo;
