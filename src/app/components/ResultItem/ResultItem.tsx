import { IResultItem } from "@/app/interfaces/SearchResult";
import { COLORS } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { XStack, YGroup } from "tamagui";
import Button from "../Button/Button";

export default function ResultItem({
  item: { snippet },
}: {
  item: IResultItem;
}) {
  const downloadIcon = (
    <MaterialIcons
      name="download-for-offline"
      size={22}
      color={COLORS.green}
      style={{ marginRight: 5 }}
    />
  );

  const children = (
    <View style={styles.item}>
      <Image
        source={{
          uri: snippet.thumbnails.default.url,
        }}
        style={styles.thumbnail}
      />
      <XStack flexDirection="column" style={styles.informations}>
        <Text style={styles.videoTitle} numberOfLines={1} ellipsizeMode="tail">
          {snippet.title}
        </Text>
        <Text style={styles.channel} numberOfLines={1} ellipsizeMode="tail">
          {snippet.channelTitle}
        </Text>
        <Button
          title="Download"
          icon={downloadIcon}
          buttonStyles={styles.downloadButton}
          textStyles={styles.buttonText}
          onPress={() => ToastAndroid.show("clicked", 1000)}
        />
      </XStack>
    </View>
  );

  return <YGroup.Item children={children} />;
}

const styles = StyleSheet.create({
  item: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",

    backgroundColor: COLORS.secondaryBlack,

    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 5,
    elevation: 7,

    marginVertical: 20,
  },
  thumbnail: {
    width: 75,
    height: "100%",
    marginRight: 10,
  },
  informations: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  videoTitle: {
    maxWidth: "85%",
    color: COLORS.white,
    fontFamily: "LatoSemiBold",
    fontSize: 14,
    marginTop: 5,
  },
  channel: {
    maxWidth: "85%",
    color: COLORS.grey,
    fontFamily: "LatoRegular",
    fontSize: 10,
  },
  downloadButton: {
    width: 100,
    justifyContent: "flex-start",
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: "none",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 10,
    fontFamily: "LatoSemiBold",
    color: COLORS.green,
  },
});
